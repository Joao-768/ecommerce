-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 23-Jun-2026 às 22:32
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Addresses`
--

CREATE TABLE `Addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `district` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Addresses`
--

INSERT INTO `Addresses` (`id`, `user_id`, `street`, `city`, `postal_code`, `country`, `district`) VALUES
(2, 56, 'Rua das Flores N123', 'Vila Boa do Bispo', '4123-456', 'Portugal', 'Porto');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Admin_Tasks`
--

CREATE TABLE `Admin_Tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','In Progress','Done','Cancelled') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Admin_Tasks`
--

INSERT INTO `Admin_Tasks` (`id`, `task`, `description`, `status`, `created_at`) VALUES
(2, 'Delete Product 4', 'Delete product 4 (The Amethyst Fox)', 'In Progress', '2026-04-25 21:44:57');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Cart_Items`
--

CREATE TABLE `Cart_Items` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `size_mm` int(11) NOT NULL DEFAULT 36
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Cart_Items`
--

INSERT INTO `Cart_Items` (`user_id`, `product_id`, `quantity`, `size_mm`) VALUES
(56, 1, 1, 40);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `code`) VALUES
(1, 'daily', 'DA'),
(2, 'casual', 'CA'),
(3, 'elegance', 'EL');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Collections`
--

CREATE TABLE `Collections` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `code` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Collections`
--

INSERT INTO `Collections` (`id`, `name`, `description`, `code`) VALUES
(1, 'Eternal Beasts', 'Main collection inspired by exotic animals', 'EB'),
(2, 'Spring Edition', 'Spring seasonal limited line', 'SP'),
(3, 'Summer Edition', 'Summer seasonal limited line', 'SU'),
(4, 'Fall Edition', 'Fall seasonal limited line', 'FA'),
(5, 'Winter Edition', 'Winter seasonal limited line', 'WE'),
(6, 'Limited Edition', 'Numbered exclusive models', 'LE');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Genders`
--

CREATE TABLE `Genders` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Genders`
--

INSERT INTO `Genders` (`id`, `name`) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'Unisex');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('paid','processing','shipped','delivered','cancelled') DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `nif` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Orders`
--

INSERT INTO `Orders` (`id`, `user_id`, `total_price`, `status`, `payment_method_id`, `created_at`, `nif`) VALUES
(35, 56, 125000.00, 'paid', NULL, '2026-06-17 08:49:38', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Order_Addresses`
--

CREATE TABLE `Order_Addresses` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(50) NOT NULL,
  `district` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `type` enum('billing','delivery') NOT NULL DEFAULT 'delivery'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Order_Addresses`
--

INSERT INTO `Order_Addresses` (`id`, `order_id`, `street`, `city`, `postal_code`, `district`, `country`, `type`) VALUES
(12, 35, 'Rua Dos Pimpa', 'Lixa', '1234-456', 'Porto', 'Portugal', 'delivery');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Order_Items`
--

CREATE TABLE `Order_Items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `size` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Order_Items`
--

INSERT INTO `Order_Items` (`id`, `order_id`, `product_id`, `price_at_purchase`, `product_name`, `quantity`, `size`) VALUES
(43, 35, 1, 12500.00, 'The White Fang', 10, '36');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Order_Status_History`
--

CREATE TABLE `Order_Status_History` (
  `order_id` int(11) NOT NULL,
  `status` enum('paid','processing','shipped','delivered','cancelled') DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Order_Status_History`
--

INSERT INTO `Order_Status_History` (`order_id`, `status`, `changed_at`) VALUES
(35, 'paid', '2026-06-17 08:49:38');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Payment_Methods`
--

CREATE TABLE `Payment_Methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `card_number` varchar(19) NOT NULL,
  `expiry` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Payment_Methods`
--

INSERT INTO `Payment_Methods` (`id`, `user_id`, `card_number`, `expiry`) VALUES
(2, 56, '3456', '12/30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Preferences`
--

CREATE TABLE `Preferences` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Preferences`
--

INSERT INTO `Preferences` (`id`, `name`) VALUES
(1, 'daily'),
(2, 'casual'),
(3, 'elegance'),
(4, 'minimalist'),
(5, 'classic'),
(6, 'bold');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `collection_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender_id` int(11) DEFAULT NULL,
  `search_count` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `max_stock` int(11) DEFAULT NULL,
  `sales` int(11) DEFAULT 0,
  `code` varchar(15) DEFAULT NULL,
  `movement` varchar(100) DEFAULT NULL,
  `case_material` varchar(100) DEFAULT NULL,
  `crystal` varchar(100) DEFAULT NULL,
  `water_resistance` varchar(50) DEFAULT NULL,
  `strap` varchar(100) DEFAULT NULL,
  `warranty` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Products`
--

INSERT INTO `Products` (`id`, `name`, `price`, `stock`, `collection_id`, `category_id`, `created_at`, `gender_id`, `search_count`, `image`, `max_stock`, `sales`, `code`, `movement`, `case_material`, `crystal`, `water_resistance`, `strap`, `warranty`) VALUES
(1, 'The White Fang', 12500.00, 38, 1, 3, '2026-02-07 13:47:16', 1, 5, '/images/eternal-beasts/the-white-fang.png', 50, 8, 'EB-EL-1', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '50m / 5ATM', 'Stainless Steel', '2 Years'),
(2, 'The Onyx Panther', 9000.00, 50, 1, 3, '2026-02-07 13:47:16', 1, 4, '/images/eternal-beasts/the-onyx-panther.png', 50, 3, 'EB-EL-2', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '100m / 10ATM', 'Black Leather', '2 Years'),
(3, 'The Sapphire Lion', 10000.00, 49, 1, 3, '2026-02-10 22:05:19', 3, 0, '/images/eternal-beasts/the-sapphire-lion.png', 50, 4, 'EB-EL-3', 'Automatic', 'Gold PVD Stainless Steel', 'Sapphire Crystal', '30m / 3ATM', 'Gold Stainless Steel', '2 Years'),
(4, 'The Amethyst Fox', 4000.00, 50, 1, 2, '2026-02-10 22:14:12', 3, 0, '/images/eternal-beasts/the-amethyst-fox.png', 50, 0, 'EB-DA-4', 'Quartz', 'Stainless Steel 316L', 'Mineral Crystal', '30m / 3ATM', 'Stainless Steel', '2 Years'),
(5, 'The Emerald Serpent', 7000.00, 50, 1, 2, '2026-02-10 22:20:36', 3, 4, '/images/eternal-beasts/the-emerald-serpent.png', 50, 0, 'EB-CA-5', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '50m / 5ATM', 'Stainless Steel', '2 Years'),
(6, 'The Golden Eagle', 11000.00, 50, 4, 3, '2026-02-10 22:22:39', 1, 1, '/images/fall-edition/the-golden-eagle.png', 50, 0, 'EB-EL-6', 'Automatic', 'Gold PVD Stainless Steel', 'Sapphire Crystal', '30m / 3ATM', 'Brown Leather', '2 Years'),
(8, 'The Ice Dragon', 3000.00, 100, 5, 3, '2026-02-10 22:28:41', 2, 2, '/images/winter-edition/the-ice-dragon.png', 100, 0, 'WE-DA-8', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '50m / 5ATM', 'Stainless Steel', '2 Years'),
(9, 'The Ruby Phoenix', 8000.00, 100, 3, 2, '2026-02-10 22:34:12', 1, 1, '/images/summer-edition/the-ruby-phoenix.png', 100, 0, 'EB-CA-9', 'Automatic', 'Black PVD Stainless Steel', 'Sapphire Crystal', '100m / 10ATM', 'Black Stainless Steel', '2 Years'),
(10, 'The Golden Sunflower', 3000.00, 100, 2, 2, '2026-03-05 16:35:38', 2, 2, '/images/spring-edition/the-golden-sunflower.png', 100, 5, 'SP-CA-10', 'Automatic', 'Gold PVD Stainless Steel', 'Sapphire Crystal', '50m / 5ATM', 'Gold Stainless Steel', '2 Years'),
(11, 'The Pinky Blossom', 4000.00, 99, 2, 3, '2026-03-05 16:35:38', 2, 1, '/images/spring-edition/the-pinky-blossom.png', 100, 6, 'SP-EL-11', 'Quartz', 'Stainless Steel 316L', 'Mineral Crystal', '30m / 3ATM', 'Stainless Steel', '2 Years'),
(12, 'The Jade Hummingbird', 2500.00, 98, 2, 1, '2026-03-05 16:35:38', 1, 0, '/images/spring-edition/the-jade-hummingbird.png', 100, 0, 'SP-DA-12', 'Quartz', 'Stainless Steel 316L', 'Mineral Crystal', '30m / 3ATM', 'Stainless Steel', '2 Years'),
(13, 'The Inferno Viper', 4500.00, 100, 3, 1, '2026-03-05 16:35:38', 2, 0, '/images/summer-edition/the-inferno-viper.png', 100, 0, 'SU-DA-13', 'Automatic', 'Gold PVD Stainless Steel', 'Sapphire Crystal', '100m / 10ATM', 'Gold Stainless Steel', '2 Years'),
(14, 'The Ember Jaguar', 3000.00, 100, 3, 2, '2026-03-05 16:35:38', 3, 0, '/images/summer-edition/the-ember-jaguar.png', 100, 0, 'SU-CA-14', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '50m / 5ATM', 'Stainless Steel', '2 Years'),
(16, 'The Amber Stag', 5000.00, 100, 4, 2, '2026-03-05 16:35:38', 2, 0, '/images/fall-edition/the-amber-stag.png', 100, 0, 'FA-CA-16', 'Quartz', 'Stainless Steel 316L', 'Mineral Crystal', '30m / 3ATM', 'Stainless Steel', '2 Years'),
(17, 'The Copper Owl', 3500.00, 100, 4, 2, '2026-03-05 16:35:38', 3, 0, '/images/fall-edition/the-copper-owl.png', 100, 0, 'FA-CA-17', 'Automatic', 'Gold PVD Stainless Steel', 'Sapphire Crystal', '30m / 3ATM', 'Gold Stainless Steel', '2 Years'),
(19, 'The Frost Monarch', 4500.00, 100, 5, 3, '2026-03-05 16:35:38', 2, 0, '/images/winter-edition/the-frost-monarch.png', 100, 0, 'WI-EL-19', 'Quartz', 'Stainless Steel 316L', 'Mineral Crystal', '50m / 5ATM', 'Black Leather', '2 Years'),
(20, 'The Arctic Wolf', 6500.00, 100, 5, 3, '2026-03-05 16:35:38', 1, 0, '/images/winter-edition/the-arctic-wolf.png', 100, 0, 'WI-EL-20', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '50m / 5ATM', 'Stainless Steel', '2 Years'),
(21, 'The Sovereign Eclipse', 15000.00, 9, 6, 3, '2026-03-05 16:35:38', 3, 0, '/images/limited-edition/the-sovereign-eclipse.png', 10, 0, 'LE-EL-21', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '100m / 10ATM', 'Stainless Steel', '2 Years'),
(22, 'The Legendary Crown', 15000.00, 10, 6, 3, '2026-03-05 16:35:38', 3, 0, '/images/limited-edition/the-legendary-crown.png', 10, 0, 'LE-EL-22', 'Automatic', 'Stainless Steel 316L', 'Sapphire Crystal', '50m / 5ATM', 'Stainless Steel', '2 Years');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Product_Preferences`
--

CREATE TABLE `Product_Preferences` (
  `product_id` int(11) NOT NULL,
  `preference_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Product_Preferences`
--

INSERT INTO `Product_Preferences` (`product_id`, `preference_id`) VALUES
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 6),
(3, 2),
(3, 6),
(4, 1),
(4, 6),
(5, 2),
(5, 4),
(6, 2),
(6, 5),
(8, 1),
(8, 4),
(9, 2),
(9, 6),
(10, 1),
(10, 2),
(11, 3),
(11, 4),
(12, 3),
(12, 5),
(13, 2),
(13, 6),
(14, 3),
(14, 6),
(16, 1),
(16, 6),
(17, 2),
(17, 6),
(19, 3),
(19, 4),
(19, 5),
(20, 2),
(20, 5),
(21, 3),
(21, 4),
(21, 5),
(22, 3),
(22, 4),
(22, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Product_Sizes`
--

CREATE TABLE `Product_Sizes` (
  `product_id` int(11) NOT NULL,
  `size_mm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Product_Sizes`
--

INSERT INTO `Product_Sizes` (`product_id`, `size_mm`) VALUES
(1, 36),
(1, 40),
(2, 44),
(2, 48),
(3, 36),
(4, 36),
(5, 36),
(5, 40),
(6, 36),
(8, 36),
(8, 40),
(9, 44),
(9, 48),
(10, 36),
(10, 40),
(11, 36),
(12, 36),
(13, 40),
(13, 44),
(14, 40),
(14, 44),
(16, 36),
(16, 40),
(17, 36),
(19, 44),
(19, 48),
(20, 36),
(20, 40),
(21, 36),
(21, 40),
(22, 36),
(22, 40);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Product_Translations`
--

CREATE TABLE `Product_Translations` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `language_code` varchar(5) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Product_Translations`
--

INSERT INTO `Product_Translations` (`id`, `product_id`, `language_code`, `description`) VALUES
(1, 1, 'en', 'Ultra-refined luxury piece with a pure white dial'),
(2, 1, 'pt', 'Peça de luxo extremamente refinada com mostrador branco'),
(3, 2, 'en', 'Black watch inspired by precision engineering'),
(4, 2, 'pt', 'Relógio preto inspirado em engenharia de precisão'),
(5, 3, 'en', 'Gold statement watch with a deep blue sapphire dial and premium finishing'),
(6, 3, 'pt', 'Relógio dourado de alta qualidade com mostrador em safira azul profundo e acabamento premium'),
(7, 4, 'en', 'Playful purple everyday watch'),
(8, 4, 'pt', 'Relógio roxo divertido para uso diário'),
(9, 5, 'en', 'Green dial with snake design elements'),
(10, 5, 'pt', 'Mostrador verde com elementos de design de serpente'),
(11, 6, 'en', 'Majestic golden watch with a leather strap'),
(12, 6, 'pt', 'Relógio majestoso dourado com pulseira de couro'),
(13, 8, 'en', 'Everyday watch with a glacier inspired minimalist dial and stainless steel case'),
(14, 8, 'pt', 'Relógio para uso diário com mostrador minimalista inspirado em glaciares e caixa de aço inoxidável'),
(15, 9, 'en', 'Intense red performance watch'),
(16, 9, 'pt', 'Relógio de alto desempenho vermelho intenso'),
(17, 10, 'en', 'Spring edition floral inspired model'),
(18, 10, 'pt', 'Modelo de edição de primavera inspirado em flores'),
(19, 11, 'en', 'Soft pink spring limited edition piece'),
(20, 11, 'pt', 'Peça de edição limitada de primavera rosa clara'),
(21, 12, 'en', 'Green dial with lightweight design'),
(22, 12, 'pt', 'Mostrador verde com design leve'),
(23, 13, 'en', 'Fiery red summer performance model'),
(24, 13, 'pt', 'Modelo de performance de verão vermelho vibrante'),
(25, 14, 'en', 'Bold ruby tone with steel case'),
(26, 14, 'pt', 'Tom vermelho vibrante com caixa de aço'),
(27, 16, 'en', 'Autumn bronze dial classic'),
(28, 16, 'pt', 'Clássico mostrador de bronze de outono'),
(29, 17, 'en', 'Orange detailing with a golden strap'),
(30, 17, 'pt', 'Detalhes em cobre com alça de couro escuro'),
(31, 19, 'en', 'Icy silver winter edition'),
(32, 19, 'pt', 'Edição de inverno de gelo e prateado'),
(33, 20, 'en', 'Minimal white dial steel case'),
(34, 20, 'pt', 'Caixa de aço com mostrador branco minimalista'),
(35, 21, 'en', 'Ultra limited luxury edition'),
(36, 21, 'pt', 'Edição de luxo ultra limitada'),
(37, 22, 'en', 'Limited collector model'),
(38, 22, 'pt', 'Modelo de colecionador limitado'),
(39, 1, 'es', 'Pieza de lujo ultra refinada con esfera blanca pura'),
(40, 1, 'fr', 'Pièce de luxe ultra raffinée avec cadran blanc pur'),
(41, 1, 'de', 'Ultrafeine Luxusuhr mit reinem weißen Zifferblatt'),
(42, 2, 'es', 'Reloj negro inspirado en ingeniería de precisión'),
(43, 2, 'fr', 'Montre noire inspirée de l\'ingénierie de précision'),
(44, 2, 'de', 'Schwarze Uhr inspiriert von Präzisionstechnik'),
(45, 3, 'es', 'Reloj dorado con esfera de zafiro azul profundo'),
(46, 3, 'fr', 'Montre dorée avec cadran saphir bleu profond'),
(47, 3, 'de', 'Goldene Uhr mit tiefblauem Saphir-Zifferblatt'),
(48, 4, 'es', 'Reloj morado divertido para uso diario'),
(49, 4, 'fr', 'Montre violette ludique pour un usage quotidien'),
(50, 4, 'de', 'Verspielter lila Alltag-Zeitmesser'),
(51, 5, 'es', 'Esfera verde con elementos de diseño de serpiente'),
(52, 5, 'fr', 'Cadran vert avec éléments de design serpent'),
(53, 5, 'de', 'Grünes Zifferblatt mit Schlangen-Designelementen'),
(54, 6, 'es', 'Reloj dorado majestuoso con correa de cuero'),
(55, 6, 'fr', 'Montre dorée majestueuse avec bracelet en cuir'),
(56, 6, 'de', 'Majestätische goldene Uhr mit Lederarmband'),
(57, 8, 'es', 'Reloj diario con esfera minimalista inspirada en glaciares'),
(58, 8, 'fr', 'Montre quotidienne avec cadran minimaliste inspiré des glaciers'),
(59, 8, 'de', 'Alltagsuhr mit minimalistischem gletscherinspiriertem Zifferblatt'),
(60, 9, 'es', 'Reloj de alto rendimiento en rojo intenso'),
(61, 9, 'fr', 'Montre haute performance rouge intense'),
(62, 9, 'de', 'Hochleistungsuhr in intensivem Rot'),
(63, 10, 'es', 'Modelo de edición primavera inspirado en flores'),
(64, 10, 'fr', 'Modèle édition printemps inspiré des fleurs'),
(65, 10, 'de', 'Frühlingsedition inspiriert von Blumen'),
(66, 11, 'es', 'Pieza de edición limitada primavera en rosa suave'),
(67, 11, 'fr', 'Pièce édition limitée printemps en rose doux'),
(68, 11, 'de', 'Limitierte Frühlingsedition in zartem Rosa'),
(69, 12, 'es', 'Esfera verde con diseño ligero'),
(70, 12, 'fr', 'Cadran vert avec design léger'),
(71, 12, 'de', 'Grünes Zifferblatt mit leichtem Design'),
(72, 13, 'es', 'Modelo de rendimiento verano en rojo ardiente'),
(73, 13, 'fr', 'Modèle performance été rouge ardent'),
(74, 13, 'de', 'Sommer-Performance-Modell in feurigem Rot'),
(75, 14, 'es', 'Tono rubí intenso con caja de acero'),
(76, 14, 'fr', 'Ton rubis intense avec boîtier en acier'),
(77, 14, 'de', 'Intensiver Rubiston mit Stahlgehäuse'),
(78, 16, 'es', 'Clásico con esfera de bronce otoñal'),
(79, 16, 'fr', 'Classique avec cadran bronze automnal'),
(80, 16, 'de', 'Klassiker mit herbstlichem Bronzezifferblatt'),
(81, 17, 'es', 'Detalles naranjas con correa dorada'),
(82, 17, 'fr', 'Détails orangés avec bracelet doré'),
(83, 17, 'de', 'Orangefarbene Details mit goldenem Armband'),
(84, 19, 'es', 'Edición invernal plateada y helada'),
(85, 19, 'fr', 'Édition hivernale argentée et glaciale'),
(86, 19, 'de', 'Winteredition in Silber und Eisblau'),
(87, 20, 'es', 'Caja de acero con esfera blanca minimalista'),
(88, 20, 'fr', 'Boîtier acier avec cadran blanc minimaliste'),
(89, 20, 'de', 'Stahlgehäuse mit minimalistischem weißem Zifferblatt'),
(90, 21, 'es', 'Edición de lujo ultra limitada'),
(91, 21, 'fr', 'Édition de luxe ultra limitée'),
(92, 21, 'de', 'Ultralimitierte Luxusedition'),
(93, 22, 'es', 'Modelo de coleccionista limitado'),
(94, 22, 'fr', 'Modèle collectionneur limité'),
(95, 22, 'de', 'Limitiertes Sammlermodell');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Sizes`
--

CREATE TABLE `Sizes` (
  `size_mm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Sizes`
--

INSERT INTO `Sizes` (`size_mm`) VALUES
(36),
(40),
(44),
(48);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `last_activity` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'active',
  `nif` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Users`
--

INSERT INTO `Users` (`id`, `email`, `role`, `created_at`, `name`, `surname`, `password_hash`, `date_of_birth`, `last_activity`, `status`, `nif`) VALUES
(56, 'user@demo.com', 'user', '2026-06-23 20:25:29', 'User', 'Demo', '$2b$10$NUdr665pnVvDzrJygl.zv.ol2ZBhN9kvvI4wmFZIn86gMKMRIuvFq', NULL, '2026-06-23 20:25:29', 'active', NULL),
(57, 'admin@demo.com', 'admin', '2026-06-23 20:26:16', 'Admin', 'Demo', '$2b$10$ecUyPqt6TYCGrh05x6s2Uep4uWbMduRJgU9rp3cOGnWnaDZKo4PaK', NULL, '2026-06-23 20:26:16', 'active', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `User_Collection`
--

CREATE TABLE `User_Collection` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `User_Collection`
--

INSERT INTO `User_Collection` (`user_id`, `product_id`, `added_at`) VALUES
(56, 1, '2026-04-18 22:57:19'),
(56, 21, '2026-05-20 10:55:21'),
(56, 22, '2026-05-20 10:55:17');

-- --------------------------------------------------------

--
-- Estrutura da tabela `User_Preferences`
--

CREATE TABLE `User_Preferences` (
  `user_id` int(11) NOT NULL,
  `preference_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `User_Preferences`
--

INSERT INTO `User_Preferences` (`user_id`, `preference_id`) VALUES
(56, 2),
(56, 3),
(56, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Wishlist_Items`
--

CREATE TABLE `Wishlist_Items` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Wishlist_Items`
--

INSERT INTO `Wishlist_Items` (`user_id`, `product_id`) VALUES
(56, 1),
(56, 2),
(56, 10);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Addresses`
--
ALTER TABLE `Addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices para tabela `Admin_Tasks`
--
ALTER TABLE `Admin_Tasks`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Cart_Items`
--
ALTER TABLE `Cart_Items`
  ADD PRIMARY KEY (`user_id`,`product_id`,`size_mm`),
  ADD KEY `ci_product_fk` (`product_id`),
  ADD KEY `ci_size_fk` (`size_mm`);

--
-- Índices para tabela `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Collections`
--
ALTER TABLE `Collections`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Genders`
--
ALTER TABLE `Genders`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Índices para tabela `Order_Addresses`
--
ALTER TABLE `Order_Addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_oa_order` (`order_id`);

--
-- Índices para tabela `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_items_ibfk_1` (`order_id`);

--
-- Índices para tabela `Order_Status_History`
--
ALTER TABLE `Order_Status_History`
  ADD PRIMARY KEY (`order_id`,`changed_at`);

--
-- Índices para tabela `Payment_Methods`
--
ALTER TABLE `Payment_Methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payment_user` (`user_id`);

--
-- Índices para tabela `Preferences`
--
ALTER TABLE `Preferences`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection_id` (`collection_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `products_ibfk_3` (`gender_id`);

--
-- Índices para tabela `Product_Preferences`
--
ALTER TABLE `Product_Preferences`
  ADD PRIMARY KEY (`product_id`,`preference_id`),
  ADD KEY `pp_ibfk_2` (`preference_id`);

--
-- Índices para tabela `Product_Sizes`
--
ALTER TABLE `Product_Sizes`
  ADD PRIMARY KEY (`product_id`,`size_mm`),
  ADD KEY `product_sizes_size_fk` (`size_mm`);

--
-- Índices para tabela `Product_Translations`
--
ALTER TABLE `Product_Translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Índices para tabela `Sizes`
--
ALTER TABLE `Sizes`
  ADD PRIMARY KEY (`size_mm`);

--
-- Índices para tabela `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices para tabela `User_Collection`
--
ALTER TABLE `User_Collection`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `user_collection_ibfk_2` (`product_id`);

--
-- Índices para tabela `User_Preferences`
--
ALTER TABLE `User_Preferences`
  ADD PRIMARY KEY (`user_id`,`preference_id`),
  ADD KEY `user_preferences_ibfk_2` (`preference_id`);

--
-- Índices para tabela `Wishlist_Items`
--
ALTER TABLE `Wishlist_Items`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Addresses`
--
ALTER TABLE `Addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `Admin_Tasks`
--
ALTER TABLE `Admin_Tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `Collections`
--
ALTER TABLE `Collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `Genders`
--
ALTER TABLE `Genders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `Order_Addresses`
--
ALTER TABLE `Order_Addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `Order_Items`
--
ALTER TABLE `Order_Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de tabela `Payment_Methods`
--
ALTER TABLE `Payment_Methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `Preferences`
--
ALTER TABLE `Preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `Product_Translations`
--
ALTER TABLE `Product_Translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT de tabela `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `Addresses`
--
ALTER TABLE `Addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Cart_Items`
--
ALTER TABLE `Cart_Items`
  ADD CONSTRAINT `ci_product_fk` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ci_size_fk` FOREIGN KEY (`size_mm`) REFERENCES `Sizes` (`size_mm`),
  ADD CONSTRAINT `ci_user_fk` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_payment_fk` FOREIGN KEY (`payment_method_id`) REFERENCES `Payment_Methods` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `Order_Addresses`
--
ALTER TABLE `Order_Addresses`
  ADD CONSTRAINT `fk_oa_order` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_order_addresses` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Order_Items`
--
ALTER TABLE `Order_Items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Order_Status_History`
--
ALTER TABLE `Order_Status_History`
  ADD CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Payment_Methods`
--
ALTER TABLE `Payment_Methods`
  ADD CONSTRAINT `fk_payment_user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `Collections` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`gender_id`) REFERENCES `Genders` (`id`) ON DELETE SET NULL;

--
-- Limitadores para a tabela `Product_Preferences`
--
ALTER TABLE `Product_Preferences`
  ADD CONSTRAINT `pp_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pp_ibfk_2` FOREIGN KEY (`preference_id`) REFERENCES `Preferences` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Product_Sizes`
--
ALTER TABLE `Product_Sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_sizes_size_fk` FOREIGN KEY (`size_mm`) REFERENCES `Sizes` (`size_mm`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Product_Translations`
--
ALTER TABLE `Product_Translations`
  ADD CONSTRAINT `product_translations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `User_Collection`
--
ALTER TABLE `User_Collection`
  ADD CONSTRAINT `user_collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_collection_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `User_Preferences`
--
ALTER TABLE `User_Preferences`
  ADD CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_preferences_ibfk_2` FOREIGN KEY (`preference_id`) REFERENCES `Preferences` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `Wishlist_Items`
--
ALTER TABLE `Wishlist_Items`
  ADD CONSTRAINT `wishlist_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Email verification & password reset support
--
ALTER TABLE `Users`
  ADD COLUMN `email_verified` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN `email_verification_code` VARCHAR(10) DEFAULT NULL,
  ADD COLUMN `email_verification_expires` DATETIME DEFAULT NULL,
  ADD COLUMN `password_reset_code` VARCHAR(10) DEFAULT NULL,
  ADD COLUMN `password_reset_expires` DATETIME DEFAULT NULL;

UPDATE `Users` SET `email_verified` = 1 WHERE `password_hash` IS NOT NULL;

--
-- Missing description column on Products
--
ALTER TABLE `Products`
  ADD COLUMN `description` TEXT DEFAULT NULL AFTER `name`;

--
-- NIF must be unique per user
--
UPDATE `Users` SET `nif` = NULL WHERE `id` IN (54, 56);
ALTER TABLE `Users`
  ADD UNIQUE KEY `unique_nif` (`nif`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
