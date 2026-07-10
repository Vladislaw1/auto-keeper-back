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

async function main() {
    for (const wt of workTypes) {
        await prisma.workType.upsert({
            where: { name: wt.name },
            update: {},
            create: wt,
        });
    }
    console.log(`Seeded ${workTypes.length} work types`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });