/* Deletes Database Tables */

DROP TABLE IF EXISTS Expense;
DROP TABLE IF EXISTS Funding_Request;
DROP TABLE IF EXISTS Issue;
DROP TABLE IF EXISTS Dependency;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS Requirement;
DROP TABLE IF EXISTS Team_Member;
DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS App_User;

/* Creates Database Tables */

CREATE TABLE App_User (
	User_ID SERIAL,
	Username TEXT UNIQUE NOT NULL,
	Pass_Word TEXT UNIQUE NOT NULL,
	User_Type TEXT NOT NULL,
	First_Name TEXT NOT NULL,
	Last_Name TEXT NOT NULL,
	Email_Address TEXT NOT NULL,
	PRIMARY KEY (User_ID)
);

CREATE TABLE Project (
	Project_ID SERIAL,
	Project_Manager INTEGER NOT NULL,
	Project_Name TEXT NOT NULL,
	Project_Desc TEXT NOT NULL,
	Budget NUMERIC NOT NULL,
	Start_Date DATE NOT NULL,
	Deadline_Date DATE NOT NULL,
	End_Date DATE,
	Current_Cost NUMERIC DEFAULT 0 NOT NULL,
	PRIMARY KEY (Project_ID),
	FOREIGN KEY (Project_Manager) REFERENCES App_User (User_ID)
);

CREATE TABLE Team_Member (
	User_ID INTEGER NOT NULL,
	Project_ID INTEGER NOT NULL,
	Daily_Rate NUMERIC NOT NULL,
	PRIMARY KEY (User_ID, Project_ID),
	FOREIGN KEY (User_ID) REFERENCES App_User (User_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID)
);

CREATE TABLE Requirement (
	Requirement_ID SERIAL,
	Project_ID INTEGER NOT NULL,
	Requirement_Desc TEXT NOT NULL,
	Priority TEXT NOT NULL,
	Requirement_Status TEXT DEFAULT 'Not Started' NOT NULL,
	PRIMARY KEY (Requirement_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID)
);

CREATE TABLE Task (
	Task_ID SERIAL,
	Project_ID INTEGER NOT NULL,
	Assigned_To INTEGER,
	Task_Name TEXT NOT NULL,
	Start_Date DATE,
	Duration INTEGER DEFAULT 1 NOT NULL,
	Progress NUMERIC DEFAULT 0.0 NOT NULL,
	PRIMARY KEY (Task_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID),
	FOREIGN KEY (Assigned_To) REFERENCES App_User (User_ID)
);

CREATE TABLE Dependency (
	Dependency_ID SERIAL,
	Project_ID INTEGER NOT NULL,
	Source_Task INTEGER NOT NULL,
	Target_Task INTEGER NOT NULL,
	PRIMARY KEY (Dependency_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID),
	FOREIGN KEY (Source_Task) REFERENCES Task (Task_ID) ON DELETE CASCADE,
	FOREIGN KEY (Target_Task) REFERENCES Task (Task_ID) ON DELETE CASCADE
);

CREATE TABLE Issue (
	Issue_ID SERIAL,
	Project_ID INTEGER NOT NULL,
	Author INTEGER NOT NULL,
	Issue_Desc TEXT NOT NULL,
	Severity TEXT NOT NULL,
	Issue_Timestamp TIMESTAMP NOT NULL,
	Is_Resolved BOOLEAN DEFAULT FALSE NOT NULL,
	Resolve_Date DATE,
	Resolution TEXT,
	PRIMARY KEY (Issue_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID),
	FOREIGN KEY (Author) REFERENCES App_User (User_ID)
);

CREATE TABLE Funding_Request (
	Request_ID SERIAL,
	Project_ID INTEGER NOT NULL,
	Initiator INTEGER NOT NULL,
	Request_Amount NUMERIC NOT NULL,
	Justification TEXT NOT NULL,
	Submit_Date DATE NOT NULL,
	Suspense_Date DATE NOT NULL,
	Review_Date DATE,
	Review_Status TEXT DEFAULT 'Pending Review' NOT NULL,
	Review_Note TEXT,
	Reviewed_By INTEGER,
	PRIMARY KEY (Request_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID),
	FOREIGN KEY (Initiator) REFERENCES App_User (User_ID),
	FOREIGN KEY (Reviewed_By) REFERENCES App_User (User_ID)
);

CREATE TABLE Expense (
	Expense_ID SERIAL,
	Project_ID INTEGER NOT NULL,
	Employee INTEGER,
	Expense_Desc TEXT,
	Expense_Type TEXT NOT NULL,
	Expense_Amount NUMERIC NOT NULL,
	PRIMARY KEY (Expense_ID),
	FOREIGN KEY (Project_ID) REFERENCES Project (Project_ID),
	FOREIGN KEY (Employee) REFERENCES App_User (User_ID)
);

/* Inserts Sample Data Into Database Tables */

-- Inserts 30 Entries into App_User Table
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Mean Dean Machine', 'H3lp!', 'General Manager', 'Jeffrey', 'Dean', 'jeffrey.dean@spaceforce.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('ahrohn92', 'Reality5!', 'Project Manager', 'Andrew', 'Rohn', 'andrew.rohn@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Darth Vayda', 'I_like_pickles', 'Project Manager', 'Peter', 'Vayda', 'peter.vayda@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Hosoya Destroya', '<#i-luv-css/>', 'Project Manager', 'Emily', 'Hosoya', 'emily.hosoya@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Prima Donna', 'My_D0nna', 'Developer', 'Donna', 'Farris', 'donna.farris@spaceforce.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Ben10', 'is_O-kehe', 'Developer', 'Benjamin', 'Kehe', 'benjamin.kehe@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Gregorious B.I.G.', 'Mac>PC', 'Developer', 'Gregory', 'Oladipo', 'greg.oladapio@galvanize.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Jolly Poli', 'pic.JPG', 'Developer', 'Poli', 'Gonzalez', 'pole.gonzalez@galvanize.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('KitKat90', 'lolK@tz', 'Developer', 'Kathryn', 'Hoesley', 'katie.hoesley@galvanize.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Tiggum', 'Rohn_is_so_cool', 'Developer', 'Caden', 'Reynolds', 'caden.reynolds.1@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('El Gato Malo', 'BitCoin>50k', 'Developer', 'Gato', 'Harvey', 'gato.harvey@kr.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('TheBigSoup', 'Moldy_Bread', 'Developer', 'Choliel', 'Campbell', 'ccampbell@gmail.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Zac-n-Cheese', 'password?', 'Developer', 'Zachary', 'Mansell', 'zach.mansell@galvanize.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Boxcar Joe', 'm149989', 'Developer', 'Matthew', 'Jones', 'mgjones93@gmail.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Bruce Almighty', 'rockinBruce54', 'Developer', 'Bruce', 'Hill', 'brucehill54@aol.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('JanetE61', 'Life_Is_Love', 'Developer', 'Janet', 'Eileen', 'jecreates@yahoo.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('JD Slappin', 'Dr.Pepper4Life', 'Developer', 'Jacob', 'DeWitt', 'jacob.dewitt.1@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('BigMac', 'w/cheese', 'Developer', 'Christian', 'McClellan', 'christian.mcclellan@spaceforce.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('KFC Knight', 'kentucky_warrior!', 'Developer', 'Eric', 'McClure', 'ericmcclure91@gmail.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('BB Boss', 'bbq3231211', 'Developer', 'Brandon', 'Bischoff', 'brandon.bischoff@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('AshJ89', 'unicorns&books', 'Project Manager', 'Ashley', 'Johnson', 'ashley.johnson@spaceforce.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Gare-Bear', 'Learn2Code', 'Project Manager', 'Gary', 'Stanhope', 'garystanhope79@yahoo.com');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Isaiah Playah', 'F@ct$!', 'Developer', 'Isaiah', 'Williams', 'isaiah.williams.2@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Nepali Prince', 'sagarmatha97', 'Developer', 'Bimali', 'Indiras', 'bimali.indiras@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Cody Coder', 'KingCode95', 'Developer', 'Cody', 'King', 'cody.king.4@spaceforce.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Richard III', 'e5mafia', 'Developer', 'Richard', 'Velez', 'richard.velez.3@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Rayman', 'Alpha_serentity123', 'Developer', 'Jacob', 'Ray', 'jacob.ray.2@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Stumeister', 'WOWlvl80orc', 'Developer', 'Kevin', 'Stuart', 'kevin.stuart.1@us.af.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Keyboard Warrior', 'db460-4me', 'Developer', 'Scott', 'Parks', 'scott.parks.2@spaceforce.mil');
INSERT INTO App_User (Username, Pass_Word, User_Type, First_Name, Last_Name, Email_Address)
	VALUES ('Mama Sass', 'phone-n-chill', 'Developer', 'Nona', 'Luke', 'nonaluke@gmail.com');

-- Inserts 3 Entries into Project Table
INSERT INTO Project (Project_Manager, Project_Name, Project_Desc, Budget, Start_Date, Deadline_Date, End_Date, Current_Cost)
	VALUES (2, 'USSF Leave Tracker', 'An app that displays the leave information of all guardians within a Space Delta and expediates the leave process.', 25000.00, '2020-07-01', '2020-08-31', '2020-08-04', 17458.00);
INSERT INTO Project (Project_Manager, Project_Name, Project_Desc, Budget, Start_Date, Deadline_Date, End_Date, Current_Cost)
	VALUES (3, 'SAT-STAT', 'An app that tracks the position of all satellites controlled by the USSF and the USAF, and returns regular status updates to Mission Control.', 45000.00, '2020-12-14', '2021-02-14', null, 31248.00);
INSERT INTO Project (Project_Manager, Project_Name, Project_Desc, Budget, Start_Date, Deadline_Date, End_Date, Current_Cost)
	VALUES (4, 'Autonomous Warfare Decision Maker', 'A system that uses AI deep learning to make immediate warfighting suggestions to Commanders based on data from statistical models of previous war games.', 100000.00, '2020-11-10', '2021-03-31', null, 73716.00);

-- Inserts 19 Entries into Team_Member Table
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (2, 1, 472.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (5, 1, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (6, 1, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (7, 1, 264.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (8, 1, 256.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (3, 2, 486.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (9, 2, 256.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (10, 2, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (11, 2, 238.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (12, 2, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (13, 2, 256.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (4, 3, 466.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (14, 3, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (15, 3, 264.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (16, 3, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (17, 3, 256.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (18, 3, 238.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (19, 3, 224.00);
INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate)
	VALUES (20, 3, 293.00);

-- Inserts 18 Entries into Requirement Table
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (1, 'App must display a list of all guardians along with their available leave.', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (1, 'Guardians should be able to submit a leave request to their supervisors for approval.', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (1, 'Supervisors should be able to approve or deny a leave request.', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (1, 'All approved leave request should be populated on a user-friendly calendar.', 'Medium', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (1, 'The user should be able to select a different language that all text is rendered in.', 'Low', 'Cancelled');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (2, 'App should have a UI that displays a globe, all USSF satellites, and their orbits around the globe.', 'Medium', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (2, 'The system should request a status update for each satellite at a interval decided by the user.', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (2, 'The system should display the statuses of all satellites in a table.', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (2, 'The table should have a search feature to quickly find a particular satellite.', 'Medium', 'Started');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority)
	VALUES (2, 'When a user selects a satellite, more detailed information about the satellite and its status should be displayed.', 'Medium');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority)
	VALUES (2, 'The system should allow users to open maintenance jobs for malfunctioning satellites.', 'Medium');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (3, 'The system displays a world map that highlights all conflict zones.', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (3, 'When a user selects a conflict zone, the system displays all friendly warfigher capabilities in that area (e.g. troops, airplanes, ships).', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (3, 'When a user selects a conflict zone, the system displays all enemy warfigher capabilities in that area (e.g. troops, airplanes, ships).', 'High', 'Completed');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (3, 'The system continuosly tracks and updates the position and status of all identified warfighter capabilites.', 'High', 'Started');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status)
	VALUES (3, 'The system AI determines the best course of action (i.e. least friendly casualties vs. most enemy casualties) based on the projected probability of success.', 'High', 'Started');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority)
	VALUES (3, 'The system displays and highlights the statistics of the optimal course of action to the leading commanding officer.', 'High');
INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority)
	VALUES (3, 'The system displays the statistics of all alternate courses of action to the leading commanding officer.', 'Medium');

-- Inserts 37 Entries into Task Table
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 2, 'Assemble Project Team', '2020-07-01', 2, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 2, 'Create Project Plan', '2020-07-03', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 2, 'Create Work Schedule', '2020-07-06', 2, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 5, 'Requirements Analysis', '2020-07-08', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 6, 'Develop Database', '2020-07-11', 5, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 8, 'Create REST API', '2020-07-11', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 7, 'Develop Application', '2020-07-16', 15, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 5, 'Testing', '2020-07-31', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (1, 8, 'Implementation', '2020-08-03', 2, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 3, 'Assign Team', '2020-12-14', 1, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 3, 'Form Project Plan', '2020-12-15', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 3, 'Requirements Gathering', '2020-12-18', 5, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 3, 'Create Schedule', '2020-12-23', 2, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 13, 'Develop App Database', '2020-12-25', 10, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 9, 'Design App UI', '2020-12-25', 5, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 11, 'Build API for Sat Communication', '2020-12-25', 14, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 9, 'Develop UI', '2020-12-30', 14, 0.7);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 10, 'Develop Back-End', '2021-01-08', 14, 0.5);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 12, 'Testing', '2021-01-22', 5, 0.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 13, 'Implementation', '2021-01-27', 3, 0.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (2, 3, 'Training Users', '2021-01-30', 2, 0.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 4, 'Form Project Team', '2020-11-10', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 15, 'Requirements Analysis', '2020-11-13', 14, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 4, 'Publish Project Plan', '2020-11-27', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 4, 'Create Schedule', '2020-11-30', 1, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 14, 'Create Database ERD', '2020-12-01', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 20, 'Build AI Model', '2020-12-01', 30, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 14, 'Write Database SQL', '2020-12-04', 3, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 16, 'Design UI Prototype', '2020-12-04', 14, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 14, 'Insert Data Into Database', '2020-12-07', 7, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 19, 'Create REST API Endpoints', '2020-12-07', 7, 1.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 20, 'Train AI Model', '2020-12-31', 30, 0.4);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 18, 'Build System Application', '2020-12-31', 30, 0.6);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 16, 'Develop System UI', '2020-12-31', 30, 0.3);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 17, 'Test System', '2021-01-31', 14, 0.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 18, 'Implement System', '2021-02-14', 5, 0.0);
INSERT INTO Task (Project_ID, Assigned_To, Task_Name, Start_Date, Duration, Progress)
	VALUES (3, 4, 'User Training', '2021-02-19', 3, 0.0);

-- Inserts 41 Entries into Dependency Table
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 1, 2);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 2, 3);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 3, 4);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 4, 5);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 4, 6);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 5, 7);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 6, 7);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 7, 8);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (1, 8, 9);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 10, 11);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 11, 12);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 12, 13);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 13, 14);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 13, 15);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 13, 16);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 15, 17);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 14, 18);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 16, 18);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 17, 19);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 18, 19);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 19, 20);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (2, 20, 21);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 22, 23);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 23, 24);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 24, 25);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 25, 26);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 25, 27);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 26, 28);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 26, 29);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 28, 30);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 28, 31);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 27, 32);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 27, 33);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 30, 33);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 31, 33);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 29, 34);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 32, 35);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 33, 35);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 34, 35);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 35, 36);
INSERT INTO Dependency (Project_ID, Source_Task, Target_Task)
	VALUES (3, 36, 37);

-- Inserts 10 Entries into Issue Table
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (1, 6, 'Lunch breaks are too short. Perhaps 1.5 hours would be better than just 1 hour.', 'Low', '2020-07-06 13:42:38', true, '2020-07-09', 'Extended the lunch break to 1.5 hours.');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (1, 5, 'Our development workstations are slow and need more RAM. Can we please put in a funding request for more RAM?', 'Medium', '2020-07-11 10:06:52', true, '2020-07-18', 'The funding request was approved and the new RAM has arrived today.');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (1, 7, 'The requirement for having multiple language options seems unnecessary and time-consuming since everything in the military is in English. I say we skip that requirement unless someone can explain why it is necessary.', 'Medium', '2020-07-23 14:19:02', true, '2020-07-24', 'I agree and I have decided to cancel this requirement.');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (2, 10, 'Daily standup meetings take too long. There is often a lot of discussion about things that are not related to the project. I would prefer if we saved personal discussions for when we are not doing meetings.', 'Low', '2020-12-22 10:11:42', true, '2020-12-23', 'The team agreed that daily meetings should be kept short and on-topic.');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp)
	VALUES (2, 13, 'A couple of people (you know who you are) are not writing enough comments/unit tests to explain your coding decisions. From here on out, please consider making your code more readable for everyone else.', 'Low', '2021-01-14 11:45:12');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (3, 17, 'Our office chairs are REALLY uncomfortable. Could we put in a funding request for some new chairs? My back hurts.', 'Low', '2020-11-14 12:05:18', true, '2020-11-25', 'Got the new chairs!');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (3, 17, 'Only three days off for the holidays? Are you serious? We should have at least a week off. COME ON!', 'Medium', '2020-12-17 13:16:56', true, '2020-12-18', 'I updated the schedule so that now everyone has 4 days off. Merry Christmas!');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (3, 19, 'The latest Windows update keeps causing our dev environments to crash, thus eliminating hours of work. We need to either consider moving our work to a cloud environment or revert to an older version of Windows to prevent this issue from reoccuring.', 'High', '2020-12-09 10:29:35', true, '2020-12-15', 'Unfortunately, our funding request was denied. We''ll need to revert back to an earlier Windows update.');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (3, 20, 'The deep learning model needs more datasets to train it properly. Is there anyway we can get more war game scenarios?',	'High', '2021-01-02 15:07:18', true, '2021-01-06', 'We were able to acquire more war game scenarios to better train the AI system.');
INSERT INTO Issue (Project_ID, Author, Issue_Desc, Severity, Issue_Timestamp, Is_Resolved, Resolve_Date, Resolution)
	VALUES (3, 16, 'The UI should differentiate between our own assets and allied assets. I was thinking our assets should be displayed in yellow and allied assets should be blue. There just needs to be some sort of distinction.', 'High', '2021-01-05 09:15:31', true, '2021-01-06', 'We discussed this during the morning''s standup meeting and everyone agreed.');

-- Inserts 3 Entries into Funding_Request Table
INSERT INTO Funding_Request (Project_ID, Initiator, Request_Amount, Justification, Submit_Date, Suspense_Date, Review_Date, Review_Status, Reviewed_By)
	VALUES (1, 2, 1350.00, 'Need to purchase 8x 16 GB RAM modules to improve the performance of our development workstation computers.', '2020-07-12', '2020-07-26', '2020-07-13', 'Approved', 1);
INSERT INTO Funding_Request (Project_ID, Initiator, Request_Amount, Justification, Submit_Date, Suspense_Date, Review_Date, Review_Status, Review_Note, Reviewed_By)
	VALUES (3, 4, 2100.00, 'We would like funding to replace 7 computer chairs (~$300 ea) for our developers. The ones we have currently are quite uncomfortable.', '2020-11-16', '2020-11-30', '2020-11-18', 'Approved', 'We want our developers to feel comfortable. Enjoy the chairs.', 1);
INSERT INTO Funding_Request (Project_ID, Initiator, Request_Amount, Justification, Submit_Date, Suspense_Date, Review_Date, Review_Status, Review_Note, Reviewed_By)
	VALUES (3, 4, 56000.00, 'We are having issues with our local workstation computers and we would like to move our work to the Amazon Web Service cloud environment to finish the project''s development. That way we do not lose hours of progress due to random software and hardware issues. The amount requested would pay for an AWS subscription for the rest of the project''s development.', '2020-12-10', '2020-12-31', '2020-12-14', 'Denied', 'Find other means of securing your workcenter''s work. The amount you are asking for is simply too much at this time.', 1);

-- Inserts 29 Entries into Expense Table
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (1, 2, 'Labor', 3304.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (1, 5, 'Labor', 1344.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (1, 6, 'Labor', 1120.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (1, 7, 'Labor', 3960.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (1, 8, 'Labor', 1280.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (1, 'MySQL Enterprise Edition', 'Software', 5000.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (1, 'Envato Web Development Kit', 'Software', 600.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (1, 'HPE P18584-421 Server, ProLiant MicroServer Gen10 Plus, 1 TB', 'Hardware', 850.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (2, 3, 'Labor', 6318.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (2, 9, 'Labor', 4864.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (2, 10, 'Labor', 3136.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (2, 11, 'Labor', 3332.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (2, 12, 'Labor', 1120.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (2, 13, 'Labor', 3328.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (2, 'MySQL Enterprise Edition', 'Software', 5000.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (2, '1 Year Subscription for Qt Pro Software Development Framework', 'Service', 2800.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (2, 'APC Smart-UPS 2200 LCD - USV Server 1.5TB', 'Hardware', 1350.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 4, 'Labor', 4660.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 14, 'Labor', 2912.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 15, 'Labor', 3696.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 16, 'Labor', 9856.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 17, 'Labor', 3584.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 18, 'Labor', 8330.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 19, 'Labor', 1568.00);
INSERT INTO Expense (Project_ID, Employee, Expense_Type, Expense_Amount)
	VALUES (3, 20, 'Labor', 17580.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (3, '1 Year Subscription for IBM SPSS Modeler Personal Deep Learning Framework', 'Service', 4950.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (3, 'JUCE Pro GUI Application Framework', 'Software', 2600.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (3, 'MySQL Cluster CGE Database Management System', 'Software', 10000.00);
INSERT INTO Expense (Project_ID, Expense_Desc, Expense_Type, Expense_Amount)
	VALUES (3, 'Dual Intel Xeon Silver 4114 64GB RAM 2x 500GB SSD Server', 'Hardware', 3980.00);