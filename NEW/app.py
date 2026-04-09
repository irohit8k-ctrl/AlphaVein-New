import razorpay
from flask import Flask, render_template, request, jsonify

# Razorpay client
client = razorpay.Client(auth=("rzp_test_SVM6izqpMxSRa4", "erdf47uzqcsHFKnd7kiIb7HX"))

from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3

app = Flask(__name__)
app.secret_key = "alphavein_secret_key_2024"

# Database connection
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Create table
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT,
            address TEXT,
            date_of_birth TEXT,
            gender TEXT,
            membership_plan TEXT DEFAULT 'Basic',
            membership_start TEXT,
            membership_end TEXT,
            emergency_contact TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/workout')
def workout():
    return render_template('workout.html')

@app.route('/membership')
def membership():
    return render_template('membership.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/trainer')
def trainer():
    return render_template('trainer.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/create_order', methods=['POST'])
def create_order():
    data = request.json
    amount = data['amount']  # in paise (₹1 = 100)

    order = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    })

    return jsonify(order)

@app.route('/verify_payment', methods=['POST'])
def verify_payment():
    data = request.json

    try:
        client.utility.verify_payment_signature({
            'razorpay_order_id': data['order_id'],
            'razorpay_payment_id': data['payment_id'],
            'razorpay_signature': data['signature']
        })
        return jsonify({"status": "success"})
    except:
        return jsonify({"status": "failed"})

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    phone = request.form.get('phone', '')
    address = request.form.get('address', '')
    date_of_birth = request.form.get('date_of_birth', '')
    gender = request.form.get('gender', '')
    membership_plan = request.form.get('membership_plan', 'Basic')
    emergency_contact = request.form.get('emergency_contact', '')

    conn = get_db_connection()
    try:
        conn.execute("""INSERT INTO users (name, email, password, phone, address, date_of_birth, gender, membership_plan, emergency_contact) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                     (name, email, password, phone, address, date_of_birth, gender, membership_plan, emergency_contact))
        conn.commit()
        flash("Registered Successfully!", "success")
    except:
        flash("Email already exists!", "danger")
    conn.close()

    return redirect(url_for('login_page'))

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email=? AND password=?",
                        (email, password)).fetchone()
    conn.close()

    if user:
        session['user_id'] = user['id']
        session['user_name'] = user['name']
        session['user_email'] = user['email']
        session.modified = True
        flash("Login Successful!", "success")
    else:
        flash("Invalid Credentials!", "danger")

    return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.clear()
    flash("Logged out successfully!", "success")
    return redirect(url_for('home'))

# Admin Dashboard - Restricted to 2 admins
ADMIN_EMAILS = ['admin1@alphavein.com', 'admin2@alphavein.com']

@app.route('/admin')
def admin():
    if 'user_email' not in session:
        flash("Please login first!", "danger")
        return redirect(url_for('login_page'))
    
    if session['user_email'] not in ADMIN_EMAILS:
        flash("Access denied. Admins only!", "danger")
        return redirect(url_for('home'))
    
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users ORDER BY created_at DESC').fetchall()
    conn.close()
    return render_template('admin.html', users=users)

if __name__ == '__main__':
    # Run the Flask app on all network interfaces, port 5000
    # Access via: http://localhost:5000 or http://127.0.0.1:5000
    # To access from other devices on your network, use your computer's IP address
    # e.g., http://192.168.1.x:5000
    app.run(host='0.0.0.0', port=5000, debug=True)
