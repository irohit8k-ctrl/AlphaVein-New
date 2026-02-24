import sqlite3
import os
from datetime import datetime

# Database file path
db_path = 'c:/Users/lawre/OneDrive/Desktop/NEW/database.db'
backup_dir = 'c:/Users/lawre/OneDrive/Desktop/NEW'

# Connect to the database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()

print("=== Database Backup ===")
print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print(f"Database: {db_path}")
print(f"Tables found: {[t[0] for t in tables]}")
print()

# Export each table
for table in tables:
    table_name = table[0]
    print(f"=== Table: {table_name} ===")
    
    # Get table schema
    cursor.execute(f"PRAGMA table_info({table_name})")
    columns = cursor.fetchall()
    print(f"Columns: {[c[1] for c in columns]}")
    
    # Get all data
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()
    print(f"Row count: {len(rows)}")
    
    if rows:
        print("Data:")
        for row in rows:
            print(f"  {row}")
    print()

# Create SQL backup file
backup_file = os.path.join(backup_dir, 'backup.sql')
with open(backup_file, 'w') as f:
    # Write header
    f.write(f"-- Database Backup\n")
    f.write(f"-- Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    f.write(f"-- Database: {db_path}\n\n")
    
    # Get schema and data for each table
    for table in tables:
        table_name = table[0]
        
        # Get CREATE TABLE statement
        cursor.execute(f"SELECT sql FROM sqlite_master WHERE type='table' AND name='{table_name}'")
        create_stmt = cursor.fetchone()
        if create_stmt:
            f.write(f"{create_stmt[0]};\n\n")
        
        # Get all data
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        
        if rows:
            for row in rows:
                # Insert statement
                placeholders = ', '.join(['?'] * len(row))
                f.write(f"INSERT INTO {table_name} VALUES ({placeholders});\n".replace("?", "%s") % row)
            f.write("\n")

conn.close()

print(f"SQL backup saved to: {backup_file}")
print("Backup completed successfully!")
