import {PrismaClient,WorkCategory} from "../generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


const workTypes: { name: string; category: WorkCategory }[] = [
    // ENGINE
    { name: 'Заміна моторного масла', category: 'ENGINE' },
    { name: 'Заміна масляного фільтра', category: 'ENGINE' },
    { name: 'Заміна повітряного фільтра', category: 'ENGINE' },
    { name: 'Заміна ременя ГРМ', category: 'ENGINE' },
    { name: 'Заміна ролика/натяжувача ГРМ', category: 'ENGINE' },
    { name: 'Заміна ланцюга ГРМ', category: 'ENGINE' },
    { name: 'Заміна свічок запалювання', category: 'ENGINE' },
    { name: 'Заміна свічок розжарювання', category: 'ENGINE' },
    { name: 'Промивка інжектора', category: 'ENGINE' },
    { name: 'Заміна прокладки клапанної кришки', category: 'ENGINE' },
    { name: 'Заміна прокладки ГБЦ', category: 'ENGINE' },
    { name: 'Ремонт/заміна турбіни', category: 'ENGINE' },
    { name: 'Заміна маслознімних ковпачків', category: 'ENGINE' },
    { name: 'Розкоксовка поршневих кілець', category: 'ENGINE' },
    { name: 'Заміна опор двигуна (подушок)', category: 'ENGINE' },
    { name: 'Регулювання клапанів', category: 'ENGINE' },

    // TRANSMISSION
    { name: 'Заміна оливи в МКПП', category: 'TRANSMISSION' },
    { name: 'Заміна оливи в АКПП', category: 'TRANSMISSION' },
    { name: 'Заміна зчеплення (комплект)', category: 'TRANSMISSION' },
    { name: 'Заміна фільтра АКПП', category: 'TRANSMISSION' },
    { name: 'Ремонт МКПП', category: 'TRANSMISSION' },
    { name: 'Ремонт АКПП', category: 'TRANSMISSION' },
    { name: 'Заміна оливи в редукторі/роздатці', category: 'TRANSMISSION' },
    { name: 'Заміна ШРУС (гранати)', category: 'TRANSMISSION' },
    { name: 'Заміна пильовика ШРУС', category: 'TRANSMISSION' },

    // BRAKES
    { name: 'Заміна передніх гальмівних колодок', category: 'BRAKES' },
    { name: 'Заміна задніх гальмівних колодок', category: 'BRAKES' },
    { name: 'Заміна передніх гальмівних дисків', category: 'BRAKES' },
    { name: 'Заміна задніх гальмівних дисків', category: 'BRAKES' },
    { name: 'Заміна гальмівної рідини', category: 'BRAKES' },
    { name: 'Заміна гальмівних шлангів', category: 'BRAKES' },
    { name: 'Ремонт гальмівного супорта', category: 'BRAKES' },
    { name: 'Заміна тросика ручного гальма', category: 'BRAKES' },
    { name: 'Заміна колодок стоянкового гальма', category: 'BRAKES' },
    { name: 'Прокачка гальмівної системи', category: 'BRAKES' },

    // SUSPENSION
    { name: 'Заміна передніх амортизаторів', category: 'SUSPENSION' },
    { name: 'Заміна задніх амортизаторів', category: 'SUSPENSION' },
    { name: 'Заміна пружин підвіски', category: 'SUSPENSION' },
    { name: 'Заміна стійок стабілізатора', category: 'SUSPENSION' },
    { name: 'Заміна втулок стабілізатора', category: 'SUSPENSION' },
    { name: 'Заміна важелів підвіски', category: 'SUSPENSION' },
    { name: 'Заміна сайлентблоків', category: 'SUSPENSION' },
    { name: 'Заміна опорних підшипників', category: 'SUSPENSION' },
    { name: 'Заміна маточини колеса (ступиці)', category: 'SUSPENSION' },
    { name: 'Розвал-сходження', category: 'SUSPENSION' },

    // STEERING
    { name: 'Заміна рульових наконечників', category: 'STEERING' },
    { name: 'Заміна рульової рейки', category: 'STEERING' },
    { name: 'Заміна насоса ГПК', category: 'STEERING' },
    { name: 'Заміна оливи ГПК', category: 'STEERING' },
    { name: 'Ремонт електропідсилювача керма', category: 'STEERING' },

    // ELECTRICAL
    { name: 'Заміна акумулятора', category: 'ELECTRICAL' },
    { name: 'Заміна генератора', category: 'ELECTRICAL' },
    { name: 'Заміна стартера', category: 'ELECTRICAL' },
    { name: 'Заміна ременя генератора', category: 'ELECTRICAL' },
    { name: 'Діагностика електрики', category: 'ELECTRICAL' },
    { name: 'Заміна лампочок/фар', category: 'ELECTRICAL' },
    { name: 'Регулювання/заміна фар', category: 'ELECTRICAL' },
    { name: 'Заміна датчиків (ABS, положення колінвала тощо)', category: 'ELECTRICAL' },
    { name: 'Ремонт проводки', category: 'ELECTRICAL' },
    { name: 'Встановлення сигналізації/мультимедіа', category: 'ELECTRICAL' },

    // COOLING
    { name: 'Заміна охолоджувальної рідини (антифризу)', category: 'COOLING' },
    { name: 'Заміна радіатора охолодження', category: 'COOLING' },
    { name: 'Заміна помпи (водяного насоса)', category: 'COOLING' },
    { name: 'Заміна термостата', category: 'COOLING' },
    { name: 'Заміна патрубків системи охолодження', category: 'COOLING' },
    { name: 'Промивка системи охолодження', category: 'COOLING' },

    // FUEL_SYSTEM
    { name: 'Заміна паливного фільтра', category: 'FUEL_SYSTEM' },
    { name: 'Заміна паливного насоса', category: 'FUEL_SYSTEM' },
    { name: 'Чистка форсунок', category: 'FUEL_SYSTEM' },
    { name: 'Заміна форсунок', category: 'FUEL_SYSTEM' },
    { name: 'Ремонт/чистка ДПДЗ', category: 'FUEL_SYSTEM' },
    { name: 'Заміна паливних шлангів', category: 'FUEL_SYSTEM' },

    // EXHAUST
    { name: 'Заміна глушника', category: 'EXHAUST' },
    { name: 'Заміна каталізатора', category: 'EXHAUST' },
    { name: 'Заміна гофри (гнучкої труби)', category: 'EXHAUST' },
    { name: 'Заміна лямбда-зонда', category: 'EXHAUST' },
    { name: 'Ремонт вихлопної системи (зварювання)', category: 'EXHAUST' },

    // TIRES
    { name: 'Сезонний шиномонтаж', category: 'TIRES' },
    { name: 'Балансування коліс', category: 'TIRES' },
    { name: 'Ремонт проколу шини', category: 'TIRES' },
    { name: 'Заміна шин (комплект)', category: 'TIRES' },
    { name: 'Заміна дисків', category: 'TIRES' },
    { name: 'Зберігання сезонних шин', category: 'TIRES' },

    // BODY
    { name: 'Полірування кузова', category: 'BODY' },
    { name: 'Ремонт сколів/подряпин', category: 'BODY' },
    { name: 'Фарбування елемента кузова', category: 'BODY' },
    { name: 'Рихтування кузова', category: 'BODY' },
    { name: 'Антикорозійна обробка', category: 'BODY' },
    { name: 'Заміна лобового скла', category: 'BODY' },
    { name: 'Заміна бокового/заднього скла', category: 'BODY' },
    { name: 'Ремонт сколу на лобовому склі', category: 'BODY' },
    { name: 'Заміна щіток склоочисника', category: 'BODY' },
    { name: 'Хімчистка кузова/деталювання', category: 'BODY' },

    // INTERIOR
    { name: 'Хімчистка салону', category: 'INTERIOR' },
    { name: 'Ремонт оббивки сидінь', category: 'INTERIOR' },
    { name: 'Заміна салонного фільтра', category: 'INTERIOR' },
    { name: 'Встановлення/ремонт електропідйомників скла', category: 'INTERIOR' },

    // AC_CLIMATE
    { name: 'Заправка кондиціонера', category: 'AC_CLIMATE' },
    { name: 'Діагностика кондиціонера', category: 'AC_CLIMATE' },
    { name: 'Заміна компресора кондиціонера', category: 'AC_CLIMATE' },
    { name: 'Дезінфекція системи кондиціонування', category: 'AC_CLIMATE' },

    // DIAGNOSTICS
    { name: "Комп'ютерна діагностика двигуна", category: 'DIAGNOSTICS' },
    { name: 'Діагностика підвіски', category: 'DIAGNOSTICS' },
    { name: 'Діагностика гальмівної системи', category: 'DIAGNOSTICS' },
    { name: 'Загальна діагностика перед купівлею авто', category: 'DIAGNOSTICS' },
    { name: 'Скидання помилок (Check Engine)', category: 'DIAGNOSTICS' },

    // OTHER
    { name: 'Комплексне ТО', category: 'OTHER' },
    { name: 'Передпродажна підготовка', category: 'OTHER' },
    { name: 'Заміна акумуляторної батареї сигналізації', category: 'OTHER' },
    { name: 'Консультація механіка', category: 'OTHER' },
];

const carCatalog: { brand: string; models: string[] }[] = [
    // Японські
    {
        brand: 'Toyota',
        models: [
            'Camry', 'Corolla', 'RAV4', 'Yaris', 'Land Cruiser', 'Highlander',
            'Prius', 'C-HR', 'Auris', 'Avensis', 'Hilux', 'Supra', 'bZ4X',
        ],
    },
    {
        brand: 'Honda',
        models: [
            'Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz', 'Pilot', 'Odyssey',
            'City', 'Fit', 'ZR-V', 'e:Ny1',
        ],
    },
    {
        brand: 'Nissan',
        models: [
            'Qashqai', 'X-Trail', 'Juke', 'Leaf', 'Murano', 'Note', 'Micra',
            'Navara', 'Pathfinder', 'Ariya', 'Almera', 'Tiida',
        ],
    },
    {
        brand: 'Mazda',
        models: [
            'CX-5', 'CX-30', 'CX-60', 'CX-3', 'Mazda3', 'Mazda6', 'MX-5',
            'CX-9', 'Mazda2', 'BT-50',
        ],
    },
    {
        brand: 'Mitsubishi',
        models: [
            'Outlander', 'ASX', 'Eclipse Cross', 'L200', 'Pajero', 'Pajero Sport',
            'Lancer', 'Colt', 'Space Star',
        ],
    },
    {
        brand: 'Subaru',
        models: [
            'Forester', 'Outback', 'XV', 'Impreza', 'Legacy', 'WRX', 'BRZ',
            'Levorg', 'Solterra',
        ],
    },
    {
        brand: 'Lexus',
        models: [
            'RX', 'NX', 'UX', 'ES', 'IS', 'LS', 'GX', 'LX', 'RC', 'LC',
        ],
    },
    {
        brand: 'Suzuki',
        models: [
            'Vitara', 'Swift', 'SX4', 'Jimny', 'S-Cross', 'Ignis', 'Baleno',
            'Grand Vitara', 'Across',
        ],
    },
    {
        brand: 'Infiniti',
        models: ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80', 'FX', 'EX'],
    },
    // Німецькі
    {
        brand: 'Volkswagen',
        models: [
            'Golf', 'Passat', 'Tiguan', 'Polo', 'Touareg', 'T-Roc', 'Jetta',
            'Arteon', 'Taigo', 'ID.3', 'ID.4', 'ID.5', 'Touran', 'Caddy',
            'Transporter', 'Amarok',
        ],
    },
    {
        brand: 'BMW',
        models: [
            '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series',
            '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
            'Z4', 'iX', 'i4', 'i5', 'i7',
        ],
    },
    {
        brand: 'Mercedes-Benz',
        models: [
            'A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS',
            'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'V-Class', 'EQA',
            'EQB', 'EQC', 'EQE', 'EQS', 'AMG GT',
        ],
    },
    {
        brand: 'Audi',
        models: [
            'A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron',
            'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8', 'RS3', 'RS6',
        ],
    },
    {
        brand: 'Opel',
        models: [
            'Astra', 'Corsa', 'Insignia', 'Mokka', 'Grandland', 'Crossland',
            'Zafira', 'Combo', 'Vivaro', 'Frontera', 'Adam', 'Meriva',
        ],
    },
    {
        brand: 'Porsche',
        models: [
            '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Boxster', 'Cayman',
            '718', 'Carrera',
        ],
    },
    {
        brand: 'Skoda',
        models: [
            'Octavia', 'Superb', 'Fabia', 'Kodiaq', 'Karoq', 'Kamiq', 'Scala',
            'Rapid', 'Yeti', 'Enyaq', 'Roomster',
        ],
    },
    // Корейські
    {
        brand: 'Hyundai',
        models: [
            'Tucson', 'Santa Fe', 'i30', 'i20', 'i10', 'Elantra', 'Sonata',
            'Kona', 'Bayon', 'Palisade', 'Ioniq 5', 'Ioniq 6', 'Staria',
            'Creta', 'Accent', 'ix35',
        ],
    },
    {
        brand: 'Kia',
        models: [
            'Sportage', 'Sorento', 'Ceed', 'Rio', 'Picanto', 'Stonic', 'Niro',
            'EV6', 'EV9', 'Cerato', 'Optima', 'Soul', 'Carnival', 'XCeed',
        ],
    },
    {
        brand: 'Genesis',
        models: ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80'],
    },
    {
        brand: 'SsangYong',
        models: ['Korando', 'Rexton', 'Tivoli', 'Musso', 'Torres', 'Kyron', 'Actyon'],
    },
    // Французькі
    {
        brand: 'Renault',
        models: [
            'Megane', 'Clio', 'Duster', 'Captur', 'Kadjar', 'Koleos', 'Scenic',
            'Arkana', 'Austral', 'Talisman', 'Kangoo', 'Trafic', 'Master',
            'Zoe', 'Fluence', 'Laguna',
        ],
    },
    {
        brand: 'Peugeot',
        models: [
            '208', '308', '408', '508', '2008', '3008', '5008', 'Rifter',
            'Partner', 'Expert', 'Traveller', 'e-208', 'e-2008',
        ],
    },
    {
        brand: 'Citroen',
        models: [
            'C3', 'C4', 'C5 Aircross', 'C5 X', 'Berlingo', 'C-Elysee', 'C3 Aircross',
            'SpaceTourer', 'Jumpy', 'DS3 Crossback', 'Ami',
        ],
    },
    {
        brand: 'Dacia',
        models: [
            'Duster', 'Sandero', 'Logan', 'Jogger', 'Spring', 'Lodgy', 'Dokker',
        ],
    },
    // Італійські
    {
        brand: 'Fiat',
        models: [
            '500', 'Panda', 'Tipo', 'Punto', 'Doblo', 'Ducato', '500X', '500L',
            'Bravo', 'Linea', 'Freemont',
        ],
    },
    {
        brand: 'Alfa Romeo',
        models: ['Giulia', 'Stelvio', 'Tonale', 'Giulietta', 'MiTo', '159', '147'],
    },
    {
        brand: 'Lancia',
        models: ['Ypsilon', 'Delta', 'Thema', 'Musa'],
    },
    // Американські
    {
        brand: 'Ford',
        models: [
            'Focus', 'Fiesta', 'Mondeo', 'Kuga', 'Puma', 'Explorer', 'Mustang',
            'Ranger', 'Transit', 'Tourneo', 'EcoSport', 'Edge', 'Galaxy',
            'S-Max', 'Fusion', 'Escape',
        ],
    },
    {
        brand: 'Chevrolet',
        models: [
            'Aveo', 'Cruze', 'Captiva', 'Orlando', 'Trax', 'Malibu', 'Camaro',
            'Corvette', 'Tahoe', 'Silverado', 'Equinox', 'Spark',
        ],
    },
    {
        brand: 'Jeep',
        models: [
            'Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade',
            'Gladiator', 'Avenger', 'Commander',
        ],
    },
    {
        brand: 'Dodge',
        models: ['Challenger', 'Charger', 'Durango', 'Journey', 'Nitro', 'Caliber'],
    },
    {
        brand: 'Tesla',
        models: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
    },
    // Британські
    {
        brand: 'Land Rover',
        models: [
            'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar',
            'Discovery', 'Discovery Sport', 'Defender', 'Freelander',
        ],
    },
    {
        brand: 'Jaguar',
        models: ['XE', 'XF', 'XJ', 'F-Pace', 'E-Pace', 'I-Pace', 'F-Type'],
    },
    {
        brand: 'Mini',
        models: ['Cooper', 'Countryman', 'Clubman', 'Paceman', 'Cabrio'],
    },
    // Шведські / інші європейські
    {
        brand: 'Volvo',
        models: [
            'XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'C40', 'EX30',
            'EX90', 'V40',
        ],
    },
    {
        brand: 'SEAT',
        models: [
            'Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco', 'Alhambra', 'Toledo',
            'Cordoba', 'Altea',
        ],
    },
    // Китайські (популярні в UA)
    {
        brand: 'Chery',
        models: [
            'Tiggo 2', 'Tiggo 4', 'Tiggo 7', 'Tiggo 8', 'Arrizo 5', 'Arrizo 8',
            'Omoda 5', 'Jaecoo 7',
        ],
    },
    {
        brand: 'Geely',
        models: ['Coolray', 'Atlas', 'Monjaro', 'Emgrand', 'Tugella', 'Okavango'],
    },
    {
        brand: 'Haval',
        models: ['H6', 'Jolion', 'F7', 'F7x', 'Dargo', 'H9', 'M6'],
    },
    {
        brand: 'BYD',
        models: ['Atto 3', 'Dolphin', 'Seal', 'Han', 'Tang', 'Song Plus', 'Yuan Plus'],
    },
    {
        brand: 'Changan',
        models: ['CS35', 'CS55', 'CS75', 'UNI-K', 'UNI-T', 'Alsvin', 'Eado'],
    },
    {
        brand: 'Great Wall',
        models: ['Hover H3', 'Hover H5', 'Hover H6', 'Wingle', 'Poer'],
    },
    {
        brand: 'MG',
        models: ['ZS', 'HS', 'MG4', 'MG5', 'Marvel R', 'Cyberster'],
    },
    // Вітчизняні / СНД
    {
        brand: 'Lada',
        models: [
            'Vesta', 'Granta', 'Largus', 'Niva', 'Niva Travel', 'XRAY', 'Kalina',
            'Priora', '2110', '2114', '2107', '2109',
        ],
    },
    {
        brand: 'ZAZ',
        models: ['Sens', 'Chance', 'Forza', 'Vida', 'Lanos', 'Tavria', 'Slavuta'],
    },
    {
        brand: 'GAZ',
        models: ['Volga', 'Gazelle', 'Sobol', 'Valdai'],
    },
    {
        brand: 'UAZ',
        models: ['Patriot', 'Hunter', 'Pickup', 'Buhanka', 'Profi'],
    },
    // Інші
    {
        brand: 'Daewoo',
        models: ['Lanos', 'Nexia', 'Matiz', 'Sens', 'Leganza', 'Evanda'],
    },
    {
        brand: 'Rover',
        models: ['75', '45', '25', '200', '400', '600'],
    },
    {
        brand: 'Saab',
        models: ['9-3', '9-5', '900', '9000'],
    },
    {
        brand: 'Smart',
        models: ['Fortwo', 'Forfour', '#1', '#3'],
    },
];

async function seedCarCatalog() {
    let modelCount = 0;
    for (const item of carCatalog) {
        const brand = await prisma.carBrand.upsert({
            where: { name: item.brand },
            update: {},
            create: { name: item.brand },
        });
        for (const modelName of item.models) {
            await prisma.carModel.upsert({
                where: {
                    brandId_name: { brandId: brand.id, name: modelName },
                },
                update: {},
                create: { name: modelName, brandId: brand.id },
            });
            modelCount++;
        }
    }
    console.log(`Seeded ${carCatalog.length} brands, ${modelCount} models`);
}

async function main() {
    for (const wt of workTypes) {
        await prisma.workType.upsert({
            where: { name: wt.name },
            update: {},
            create: wt,
        });
    }

    await seedCarCatalog();
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });