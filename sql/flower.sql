
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Database: `george`
--

-- --------------------------------------------------------

--
-- Table structure for table `flower`
--

CREATE TABLE `flower` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(30) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `flower`
--

INSERT INTO `flower` (`id`, `name`, `category`, `description`, `photo`, `price`, `quantity`) VALUES
(23, 'Agapanthus', 'Herbaceous Perennials', 'Easily grown, tolerant of drought and poor soil, flower and foliage improves with feeding. Full sun.', 'agapanthus.jpg', 8.99, 10),
(4, 'Plectranthus', 'Shrubs', 'Quick-growing, herbaceous, shrub reaching up to 30 inches in height, forming a rounded, dense bush.', 'mona_lavender.jpg', 5.99, 1),
(34, 'Opuntia Falcata', 'Cacti and Succulents', 'The plants should be kept almost completely dry during the winter months, once a month should be fine.', 'opuntia_cactus.jpg', 16.99, 0),
(5, 'Camellia Japonica', 'Shrubs', 'Slow growing, upright to spreading shrub. Oval, glossy, leaves and profuse winter to spring blooming flowers.', 'camellia.jpg', 15.99, 111),
(8, 'Rosa Iceberg', 'Shrubs', 'Deep purple colored flowers bushy rounded growth habit to 3 feet tall. Plant in full sun. Water regularly.', 'rosa_iceberg.jpg', 22.99, 0),
(9, 'Bonsai Tree', 'Container Plants', 'They do not thrive indoors, where the light is too dim, and humidity too low, for them to grow properly.', 'bonsai.jpg', 45.99, 0),
(10, 'Calibrachoa Noa', 'Container Plants', 'Blooms continuously from early spring to first frost. Full sun or part shade, moist well-drained soil.', 'calibrachoa.jpg', 12.99, 10),
(11, 'Cymbidium Aestivum', 'Container Plants', 'The flowers last about ten weeks. They have a waxy texture and reach a height of more than 20 inches.', 'cymbidium.jpg', 14.99, 110),
(12, 'Brassica Oleracea', 'Container Plants', 'Creamy-white centers, medium green outer foliage with flattened outer foliage.', 'flowering_kale.jpg', 4.99, 2),
(16, 'Pansy Blue Shades', 'Container Plants', 'Compact mounds of colorful dainty flowers, good for window boxes. Fertile well drained soil.', 'pansy_blue_shades.jpg', 3.99, 10),
(17, 'Pansy Yellow with Blotch', 'Container Plants', 'Compact mounds of colorful dainty flowers, good for window boxes. Fertile well drained soil.', 'yellow_pansy.jpg', 3.99, 1),
(18, 'Phalaenopsis Purple', 'Container Plants', 'Choose the brightest windows in your house for your orchids, place on an humidity tray and spray regularly.', 'phalaenopsis.jpg', 25.99, 0),
(19, 'Dianthus', 'Herbaceous Perennials', 'They thrive in fertile, fast draining, slightly alkaline (pH 6.75) soil. Avoid overwatering.', 'dianthus.jpg', 5.99, 9),
(20, 'Chrysanthemum', 'Herbaceous Perennials', 'Chrysanthemums respond to plenty of food and moisture, and prefer full sun.', 'bronze_mums.jpg', 9.99, 1),
(21, 'Armeria Alliacea', 'Herbaceous Perennials', 'Summer flowering, 12–18” high, likes full sun and well drained soil. Drought tolerant.', 'armeria_allicaea.jpg', 7.99, 4),
(22, 'Salvia Splendens', 'Herbaceous Perennials', 'Grows to 15 inches. The species is easy to grow from seeds or cuttings. This species prefers full sun.', 'salvia.jpg', 6.99, 0),
(24, 'Iris Sibirica', 'Herbaceous Perennials', 'These plants are very hardy, easy to grow, and increase readily. Average flower size is 3-4 inches in diameter.', 'iris_siberica.jpg', 5.99, 2),
(1, 'Azalea', 'Shrubs', 'Large double. Good grower, heavy bloomer. Early to mid-season, acid loving plants. Plant in moist well drained soil with pH of 4.0-5.5.', 'california_snow.jpg', 15.99, 15),
(2, 'Tibouchina Semidecandra', 'Shrubs', 'Beautiful large royal purple flowers adorn attractive satiny green leaves that turn orange\\/red in cold weather. Grows to up to 18 feet, or prune annually to shorten.', 'princess_flower.jpg', 33.99, 19),
(3, 'Hibiscus', 'Shrubs', 'Blooms in summer, 20-35 inches high. Fertilize regularly for best results. Full sun, drought tolerant.', 'haight_ashbury.jpg', 12.99, 0),
(25, 'Chrysanthemum', 'Herbaceous Perennials', 'Chrysanthemums grow best and produce the most flowers if they are planted in full sunshine.', 'white_wedding.jpg', 9.99, 100),
(26, 'Senecio Cineraria', 'Herbaceous Perennials', 'Grown primarily for its attractive silvergray foliage rather than its yellow flowers. Drought tolerant.', 'dusty_miller.jpg', 10.99, 100),
(27, 'Red Cactus', 'Cacti and Succulents', 'Add water until there is half inch of dry soil on the surface. Do not water again until the soil is completely dry.', 'red_cactus.jpg', 18.99, 0),
(28, 'Aloe Vera', 'Cacti and Succulents', 'Drought tolerant, well drained soil. Prefers full sun.', 'aloe_vera.jpg', 30.99, 2),
(29, 'Schlumbergera', 'Cacti and Succulents', 'Easy to care for, requiring watering only when they’re dry. They like bright but indirect light.', 'exotic_dancer.jpg', 20.99, 21),
(30, 'Senecio Rowleyanus', 'Cacti and Succulents', 'Locate it in a place where it is exposed to at least a few hours of direct sunlight.', 'string_of_pearls.jpg', 18.5, 1),
(31, 'Lithops', 'Cacti and Succulents', 'These plants blend in among the stones as a means of protection. Grazing animals would otherwise eat them.', 'lithops.jpg', 12.99, 7),
(32, 'Pachycereus Marginatus', 'Cacti and Succulents', 'The Mexican Fence Post will eventually reach 20 feet tall. Protect the growing tips with Styrofoam cups on the tops.', 'mexican_fencepost_cactus.jpg', 55.99, 5),
(13, 'Viola Penny Orange Jump Up', 'Container Plants', 'Compact mounds of colorful dainty flowers, good for window boxes. Fertile well drained soil.', 'penny_orange_jumpup.jpg', 4.99, 6),
(14, 'Cotula', 'Container Plants', 'Cotula have very fragrant orange flowers that bloom in the middle of summer.', 'pincushion.jpg', 5.99, 1),
(15, 'Pelargonium Peltatum', 'Container Plants', 'Well drained neutral to slightly acid soil, bright light. Do not over-fertilize or these flowers will lose scent.', 'pelargonium.jpg', 4.99, 3),
(33, 'Echinocactus Grusonii', 'Cacti and Succulents', 'Growing as a large roughly spherical globe, it may eventually reach over a meter in height after many years.', 'mexican_golden_barrel_cactus.j', 25.99, 10);
COMMIT;
