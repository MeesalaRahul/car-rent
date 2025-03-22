-- Create database
CREATE DATABASE car_rental;
USE car_rental;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cars table
CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    speed VARCHAR(50),
    seats INT,
    milage VARCHAR(50),
    price_per_day DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255)
);

-- Bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    location VARCHAR(100) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    with_fuel BOOLEAN NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Insert sample data
INSERT INTO cars (name, type, speed, seats, milage, price_per_day, image_url) VALUES
('Toyota Corolla', 'Sedan', '180', 5, '30 MPG', 40.00, 'assets/car1.jpg'),
('Honda Civic', 'Sedan', '190', 5, '32 MPG', 45.00, 'assets/car2.jpg'),
('Tesla Model 3', 'Electric', '225', 5, '300 miles', 70.00, 'assets/car3.jpg');