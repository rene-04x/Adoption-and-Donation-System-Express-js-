-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2026 at 03:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adoption_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `adoption_applications`
--

CREATE TABLE `adoption_applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pet_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `given_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fb_link` text DEFAULT NULL,
  `contact_method` varchar(50) DEFAULT NULL,
  `employment_status` varchar(50) DEFAULT NULL,
  `pet_experience` varchar(10) DEFAULT NULL,
  `living_type` text DEFAULT NULL,
  `fenced_yard` varchar(10) DEFAULT NULL,
  `pets_allowed` varchar(10) DEFAULT NULL,
  `reason_adoption` text DEFAULT NULL,
  `application_status` varchar(50) DEFAULT 'Pending Review',
  `date_applied` timestamp NOT NULL DEFAULT current_timestamp(),
  `valid_id_path` varchar(255) DEFAULT NULL,
  `proof_address_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `admin_notes` text DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `interview_time` varchar(50) DEFAULT NULL,
  `interview_method` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adoption_applications`
--

INSERT INTO `adoption_applications` (`id`, `user_id`, `pet_name`, `last_name`, `given_name`, `middle_name`, `birthdate`, `email`, `phone`, `fb_link`, `contact_method`, `employment_status`, `pet_experience`, `living_type`, `fenced_yard`, `pets_allowed`, `reason_adoption`, `application_status`, `date_applied`, `valid_id_path`, `proof_address_path`, `status`, `admin_notes`, `interview_date`, `interview_time`, `interview_method`) VALUES
(70, 10, 'SADBOI', 'qswde', 'aqswdef', 'swde', '2026-04-16', 'jhyzzeeldianela8@gmail.com', '09814573829', 'https://www.facebook.com/', 'Email', 'Student', 'No', 'House (Owned)', 'No', 'Yes', 'qla', 'Pending Review', '2026-04-16 09:02:20', '/uploads/applications/1776330140853-47b1d2edc915909f46871573e04939cc.jpg', '/uploads/applications/1776330140860-47b1d2edc915909f46871573e04939cc.jpg', 'Approved', '', '2026-04-16', '9:00 A.M - 10:00 A.M', 'Virtual'),
(71, 10, 'Adobaby', 'qwdefrgt', 'sqwdefr', 'asqwdef', '2026-04-17', 'jhyzzeeldianela8@gmail.com', '09814573829', 'https://www.facebook.com/', 'Email', 'Employed', 'No', 'House (Rented)', 'No', 'Yes', 'ahaa', 'Pending Review', '2026-04-16 09:03:24', '/uploads/applications/1776330204891-47b1d2edc915909f46871573e04939cc.jpg', '/uploads/applications/1776330204898-47b1d2edc915909f46871573e04939cc.jpg', 'Approved', '', NULL, NULL, NULL),
(72, 10, 'Pet Name', 'jhy', 'baba', 'sdf', '2026-04-23', 'jhyzzeeldianela8@gmail.com', '09814573829', 'https://www.facebook.com/', 'Email', 'Self-Employed', 'No', 'House (Owned)', 'No', 'Yes', 'ajajaja', 'Pending Review', '2026-04-16 11:51:39', '/uploads/applications/1776340299118-47b1d2edc915909f46871573e04939cc.jpg', '/uploads/applications/1776340299127-47b1d2edc915909f46871573e04939cc.jpg', 'Approved', '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `animals`
--

CREATE TABLE `animals` (
  `animal_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `species` enum('Dog','Cat') NOT NULL,
  `gender` enum('Male','Female','Unknown') DEFAULT 'Unknown',
  `breed` varchar(100) DEFAULT NULL,
  `age_months` int(11) DEFAULT NULL,
  `color_markings` text DEFAULT NULL,
  `behavior_traits` text DEFAULT NULL,
  `current_status` varchar(255) DEFAULT NULL,
  `rescue_date` date DEFAULT NULL,
  `rescue_area` varchar(255) DEFAULT NULL,
  `rescue_story` text DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animals`
--

INSERT INTO `animals` (`animal_id`, `name`, `species`, `gender`, `breed`, `age_months`, `color_markings`, `behavior_traits`, `current_status`, `rescue_date`, `rescue_area`, `rescue_story`, `profile_photo`, `created_at`) VALUES
(1, 'Adobaby', 'Dog', 'Female', 'Aspin', 24, 'brown and white on extremities & end of tail', 'Kind,Friendly', 'Available', '2024-02-10', 'CSPC', 'idkkkk', '4bf6aa144ae48a780bff19319be59e77', '2026-04-10 16:22:59'),
(7, 'SADBOI', 'Dog', 'Male', '', 0, 'combination of black and white on the body and extremities', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:07:25'),
(8, 'NOUGAT', '', '', '', 0, 'Light-brown; dirty-white color on face', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:10:29'),
(9, 'LEBRON', 'Dog', 'Male', '', 0, 'brown/tan color overall, white markings on chest and paws (front & back), and erect ears', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:10:53'),
(10, 'CHONK', 'Dog', 'Male', '', 0, 'Brown is the dominant color, while a white color is seen in some parts (legs, tip of tail, chest, and belly); black shade around the eyes and nose', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:11:48'),
(11, 'ROTI', 'Dog', 'Male', '', 0, 'black dog with tiny brown markings above both eyes, brown patches on four legs, and white markings on the sides of the mouth', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:12:20'),
(12, 'MONDY', 'Dog', 'Male', '', 0, 'a combination of brown (upper body) and white (lower body: chest & belly)', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:12:43'),
(13, 'TACO', '', 'Male', '', 0, 'white coated dog with black nose. Has a skin infection near the left eye.', 'kind,gentle', 'Available', '1899-11-29', '', '', NULL, '2026-04-14 15:13:05'),
(14, 'DUKE', 'Dog', 'Male', '', 0, 'black dog with spots of ash gray fur', 'kind,gentle,sleepy', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:14:51'),
(15, 'ZEUS', 'Dog', 'Male', '', 0, 'old brown dog', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:16:01'),
(16, 'GEWE', 'Cat', 'Female', '', 0, '', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-14 15:16:18'),
(17, 'ALBIE', 'Cat', '', '', 0, ' light orange (back, tail, ears, forehead); white underbody, legs, and face', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 03:59:00'),
(18, 'FLERKEN', 'Cat', '', '', 0, 'orange (ginger) with light orange stripes', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:04:31'),
(19, 'BLOOP', 'Cat', '', '', 0, 'white all over the body; dark orange on the left ear, above the eyes, and on the tail', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:04:57'),
(20, 'GATO', 'Cat', '', '', 0, 'black upper body, face, ears, and legs; white chest, belly, and legs', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:05:18'),
(21, 'TIGER', 'Cat', '', '', 0, 'black and gray-ish color with tiger-like skin features; light brown on face and legs', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:05:53'),
(22, 'CHIMI', 'Cat', '', '', 0, 'yellow-ish/light orange patches on the body, ears, and tail; white chest, belly, and legs', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:06:12'),
(23, 'CHANGA', 'Cat', '', '', 0, 'a combination of orange and white colors all around the body', '', 'Available', '1899-11-29', '', '', NULL, '2026-04-15 04:06:36'),
(24, 'RED', 'Cat', '', '', 0, 'a combination of orange and white color, with a red collar', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:07:02'),
(25, 'OREO', 'Cat', '', '', 0, 'black upper body, face (including the eyes), and tail; white lower body (chest, belly, legs)', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:07:20'),
(26, 'MILO', 'Cat', '', '', 0, 'have black patches on the back, on the back of the head, and tail; white is dominant on the rest of the body', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:07:37'),
(27, 'CHEETO', 'Cat', '', '', 0, 'multi-colored domestic cat', '', 'Available', '1899-11-29', '', '', NULL, '2026-04-15 04:07:55'),
(28, 'YOGURT', 'Cat', '', '', 0, 'black and white face and body', '', 'Available', '1899-11-29', '', '', NULL, '2026-04-15 04:08:11'),
(29, 'DAVID', 'Cat', '', '', 0, '', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:09:04'),
(30, 'CHARLIE', '', 'Female', '', 0, 'grey with black stripes and green eyes', '', 'Available', '1899-11-29', '', '', NULL, '2026-04-15 04:09:36'),
(31, 'TOBI', '', 'Male', '', 0, ' orange (head & back) and white (neck, chest, legs); pink paws and nose', '', 'Available', '1899-11-29', '', '', NULL, '2026-04-15 04:09:51'),
(32, 'YURI', 'Cat', 'Male', '', 0, ' gray stripes (back), white (neck, chest, extremities)', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:10:47'),
(33, 'CLARITA ', 'Cat', '', '', 0, '', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-15 04:11:21'),
(34, 'bab', 'Dog', 'Male', 'ews', 12, 'black', '', 'Available', '2026-04-16', 'Nabua Market', 'shh', '6417563986bc207862ea38af8d60d7a9', '2026-04-16 13:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `animal_medical_history`
--

CREATE TABLE `animal_medical_history` (
  `med_id` int(11) NOT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `treatment_name` varchar(255) DEFAULT NULL,
  `date_administered` date DEFAULT NULL,
  `administered_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animal_medical_history`
--

INSERT INTO `animal_medical_history` (`med_id`, `animal_id`, `treatment_name`, `date_administered`, `administered_by`) VALUES
(38, 1, 'Deworm', '2026-03-06', 'Dr. Irene');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `venue_place` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `target_audience` varchar(50) DEFAULT NULL,
  `is_urgent` tinyint(1) DEFAULT 0,
  `pin_to_dashboard` tinyint(1) DEFAULT 0,
  `send_push_notification` tinyint(1) DEFAULT 0,
  `message_content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_notified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `event_title`, `venue_place`, `event_date`, `event_time`, `category`, `target_audience`, `is_urgent`, `pin_to_dashboard`, `send_push_notification`, `message_content`, `created_at`, `is_notified`) VALUES
(1, 'ff', 'ffff', '2026-04-02', '14:37:00', 'Event', 'All Users', 0, 1, 1, 'ffffff', '2026-04-15 04:37:30', 0),
(2, 'fff', 'ffff', '2026-04-02', '12:49:00', 'Update', 'Donors', 0, 1, 1, 'fffff', '2026-04-15 04:47:49', 0),
(3, 'fsdfdsfs', 'dfsfsdff', NULL, '13:06:00', 'General', 'All Users', 0, 1, 1, 'dsfdssf', '2026-04-15 05:04:27', 0),
(4, 'grttetyt', 'yytryrytrytrytr', '0000-00-00', '00:00:00', 'General', 'All Users', 0, 1, 1, 'ytrrtyrtyy', '2026-04-15 05:31:43', 0),
(5, 'mayen', 'ddd', '2026-04-03', '13:47:00', 'Urgent', 'All Users', 1, 1, 1, 'ddasasassas', '2026-04-15 05:45:06', 0),
(6, 'im tired', 'ssss', '2026-04-01', '13:58:00', 'Update', 'Adopters', 0, 1, 1, 'asssass', '2026-04-15 05:56:16', 0),
(7, 'so we good', 'JAJAJA', '2026-04-01', '15:58:00', 'General', 'Adopters', 0, 1, 1, 'JAJAJA', '2026-04-15 05:58:29', 0),
(8, 'PARTEHH', 'admin', '2026-03-31', '14:59:00', 'Urgent', 'All Users', 1, 1, 1, 'admin', '2026-04-15 05:59:05', 0),
(9, 'I MISS YOUUUUUU', 'CSPC', '0000-00-00', '00:00:00', 'General', 'All Users', 0, 1, 1, 'dddddddddddddd', '2026-04-15 12:44:33', 0),
(10, 'hhehe', 'cspc', '2026-04-16', '18:36:00', 'Urgent', 'All Users', 1, 1, 1, 'wala', '2026-04-16 10:34:44', 0);

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `type` enum('Cash','In-Kind') NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `ref_no` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `receipt_img` varchar(255) DEFAULT NULL,
  `status` enum('pending','verified','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `user_id`, `donor_name`, `type`, `amount`, `item_name`, `email`, `phone`, `payment_method`, `ref_no`, `date`, `receipt_img`, `status`) VALUES
(11, 10, 'Irene Espeleta', 'Cash', 700.00, 'food', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:44:30', 'receipt-1775843070350.png', 'verified'),
(12, 10, 'Irene Espeleta', 'Cash', 57.00, 'needed_most', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:45:11', 'receipt-1775843111504.png', 'verified'),
(13, 10, 'Irene Espeleta', '', NULL, 'dog food', 'irespeleta@my.cspc.edu.ph', '09767567555', NULL, NULL, '2026-04-10 17:49:39', NULL, 'verified'),
(14, 10, 'Irene Espeleta', 'Cash', 5.00, 'General', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:54:46', 'receipt-1775843685847.png', 'verified'),
(15, 10, 'Irene Espeleta', 'Cash', 56.00, 'medical', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:56:07', 'receipt-1776074766405-128835324.png', 'verified'),
(16, 10, 'Irene Espeleta', '', NULL, 'cat food', 'irespeleta@my.cspc.edu.ph', '09434444444', NULL, NULL, '2026-04-10 17:56:56', NULL, 'verified'),
(27, 10, 'Irene Espeleta', '', NULL, 'dog food', 'irespeleta@my.cspc.edu.ph', '90666666666', NULL, NULL, '2026-04-12 11:33:58', NULL, 'verified'),
(28, 10, 'Irene Espeleta', 'Cash', 500.00, 'General', NULL, NULL, 'GCash', '5555555555555', '2026-04-12 11:39:25', 'receipt-1775993965644.png', 'verified'),
(29, 10, 'Irene Espeleta', '', NULL, 'si miguela', 'irespeleta@my.cspc.edu.ph', '09444444444', NULL, NULL, '2026-04-12 11:41:43', NULL, 'verified'),
(30, 10, 'Miguela Baluca', 'Cash', 30.00, 'medical', NULL, NULL, 'GCash', '4546466464664', '2026-04-12 12:55:32', 'receipt-1775998532749.png', 'verified'),
(31, 10, 'Carla', 'Cash', 30.00, 'medical', NULL, NULL, 'GCash', '1111111111111', '2026-04-12 14:03:28', 'receipt-1776074073939-977223910.png', 'verified'),
(32, 10, 'Shanice Magbanua', 'Cash', 600.00, 'food', NULL, NULL, 'GCash', '1111111111111', '2026-04-13 08:13:26', 'receipt-1776068006188.png', 'verified'),
(33, 10, 'Jhyzzeel Dionela', '', NULL, 'poop', 'Jhyzzeel@gmail.com', '09455555555', NULL, NULL, '2026-04-13 10:20:54', NULL, 'verified'),
(34, 10, 'Jhyzeell', '', NULL, 'fhcf', 'irespeleta@my.cspc.edu.ph', '09678676767', NULL, NULL, '2026-04-13 10:29:17', NULL, 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `rejection_logs`
--

CREATE TABLE `rejection_logs` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `proof_path` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `rejected_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rejection_logs`
--

INSERT INTO `rejection_logs` (`id`, `donation_id`, `reason`, `proof_path`, `notes`, `rejected_at`) VALUES
(7, 31, 'Amount Mismatch', 'receipt-1776010688176.png', '', '2026-04-12 16:18:08'),
(8, 15, 'Blurry Screenshot', NULL, '', '2026-04-12 16:18:45'),
(9, 30, 'Invalid Reference No.', NULL, 'Ikaw at Ako', '2026-04-12 16:22:32'),
(10, 16, 'Invalid Reference No.', NULL, '', '2026-04-12 16:39:11'),
(11, 12, 'Amount Mismatch', 'receipt-1776012850457.JPG', '', '2026-04-12 16:54:10'),
(12, 12, 'Invalid Reference No.', NULL, '', '2026-04-13 10:07:46'),
(13, 31, 'Invalid Reference No.', NULL, '', '2026-04-13 10:43:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_pic` varchar(500) DEFAULT '/images/dog1.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `profile_pic`) VALUES
(10, 'irene', 'irespeleta@my.cspc.edu.ph', '$2b$10$ATRPDFh1y3KW59V03Tr9keqU9ljJJvvbtYfSh.YdzlORsW9LENq8u', '2026-04-07 15:42:13', '/uploads/profile_pics/profile-10-1776329492241.jpg'),
(11, 'admin', 'admin@gmail.com', '$2b$10$BoFOt/93Zt4NVWT/QhmVzem67fNy/dc6.EpQoG6lsjI5wVMu/CfX.', '2026-04-10 14:41:33', '/images/dog1.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`animal_id`);

--
-- Indexes for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  ADD PRIMARY KEY (`med_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `animal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  MODIFY `med_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  ADD CONSTRAINT `animal_medical_history_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`animal_id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  ADD CONSTRAINT `rejection_logs_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
