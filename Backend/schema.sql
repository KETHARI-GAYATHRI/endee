-- Create Database
CREATE DATABASE IF NOT EXISTS resume_ai_db;
USE resume_ai_db;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'HR') DEFAULT 'HR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Candidates Table
CREATE TABLE IF NOT EXISTS Candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    experience VARCHAR(100),
    education VARCHAR(255),
    score INT DEFAULT 0,
    summary TEXT,
    status ENUM('none', 'shortlisted', 'rejected', 'review', 'excellent', 'good', 'average') DEFAULT 'none',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes Table
CREATE TABLE IF NOT EXISTS Resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(id) ON DELETE CASCADE
);

-- Skills Table
CREATE TABLE IF NOT EXISTS Skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- CandidateSkills (Many-to-Many)
CREATE TABLE IF NOT EXISTS CandidateSkills (
    candidate_id INT,
    skill_id INT,
    PRIMARY KEY (candidate_id, skill_id),
    FOREIGN KEY (candidate_id) REFERENCES Candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE
);

-- MatchResults Table
CREATE TABLE IF NOT EXISTS MatchResults (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    resume_id INT,
    score INT NOT NULL,
    classification ENUM('Excellent Match', 'Good Match', 'Average', 'Rejected') NOT NULL,
    matched_skills TEXT,
    missing_skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES Resumes(id) ON DELETE CASCADE
);

-- CandidateQuestions Table (For interview questions)
CREATE TABLE IF NOT EXISTS CandidateQuestions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    question TEXT NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(id) ON DELETE CASCADE
);
