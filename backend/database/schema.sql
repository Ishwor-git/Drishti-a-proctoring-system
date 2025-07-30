-- Table: Attendee
CREATE TABLE attendee (
    attendee_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Table: Proctor
CREATE TABLE proctor (
    proctor_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
);

-- Table: Question
CREATE TABLE question (
    question_id SERIAL PRIMARY KEY,
    questions TEXT,
    question_types VARCHAR(255),
    optionA VARCHAR(255),
    optionB VARCHAR(255),
    optionC VARCHAR(255),
    optionD VARCHAR(255),
    correct_ans VARCHAR(255)
);

-- Table: Exam
CREATE TABLE exam (
    exam_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subject VARCHAR(255),
    question_id INT REFERENCES question(question_id),
    proctor_id INT REFERENCES proctor(proctor_id),
    duration INT
);

-- Table: Exam_Session
CREATE TABLE exam_session (
    session_id SERIAL PRIMARY KEY,
    attendee_id INT REFERENCES attendee(attendee_id),
    exam_id INT REFERENCES exam(exam_id),
    starttime TIMESTAMP,
    endtime TIMESTAMP,
    score INT
);

-- Table: Answers
CREATE TABLE answers (
    attendee_id INT REFERENCES attendee(attendee_id),
    question_id INT REFERENCES question(question_id),
    selected_option VARCHAR(255),
    correct BOOLEAN
);

-- Table: Log
CREATE TABLE log (
    log_id SERIAL PRIMARY KEY,
    session_id INT REFERENCES exam_session(session_id),
    timestamp TIMESTAMP,
    event_type VARCHAR(255),
    remarks TEXT
);

-- Table: Violations
CREATE TABLE violations (
    violation_id SERIAL PRIMARY KEY,
    session_id INT REFERENCES exam_session(session_id),
    description TEXT,
    level VARCHAR(255)
);
