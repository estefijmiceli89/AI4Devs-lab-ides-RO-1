import { PrismaClient, EducationLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos antes de sembrar
  await prisma.candidate.deleteMany();

  const candidates = [
    {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '+54 11 1234-5678',
      educationLevel: EducationLevel.UNIVERSITY,
      institution: 'Universidad de Buenos Aires',
      degree: 'Ingeniería en Sistemas',
      graduationYear: 2020,
      currentPosition: 'Senior Software Engineer',
      currentCompany: 'Tech Solutions SA',
      totalExperience: 5,
      startDate: new Date('2019-01-01'),
      isCurrentlyWorking: true,
      experienceDescription: 'Desarrollo de aplicaciones web y móviles usando React y Node.js'
    },
    {
      firstName: 'María',
      lastName: 'González',
      email: 'maria.gonzalez@email.com',
      phone: '+54 11 8765-4321',
      educationLevel: EducationLevel.POSTGRADUATE,
      institution: 'Universidad Nacional de La Plata',
      degree: 'Maestría en Ciencias de la Computación',
      graduationYear: 2021,
      currentPosition: 'Data Scientist',
      currentCompany: 'Data Analytics Corp',
      totalExperience: 3,
      startDate: new Date('2021-03-01'),
      isCurrentlyWorking: true,
      experienceDescription: 'Análisis de datos y machine learning para predicción de tendencias'
    },
    {
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+54 11 5555-6666',
      educationLevel: EducationLevel.UNIVERSITY,
      institution: 'Universidad Tecnológica Nacional',
      degree: 'Ingeniería Industrial',
      graduationYear: 2018,
      currentPosition: 'Project Manager',
      currentCompany: 'Global Projects Inc',
      totalExperience: 6,
      startDate: new Date('2018-06-01'),
      endDate: new Date('2023-12-31'),
      isCurrentlyWorking: false,
      experienceDescription: 'Gestión de proyectos de transformación digital y mejora de procesos'
    },
    {
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@email.com',
      phone: '+54 11 9999-8888',
      educationLevel: EducationLevel.DOCTORATE,
      institution: 'Universidad de San Andrés',
      degree: 'Doctorado en Inteligencia Artificial',
      graduationYear: 2022,
      currentPosition: 'AI Research Lead',
      currentCompany: 'AI Innovations Lab',
      totalExperience: 4,
      startDate: new Date('2022-01-01'),
      isCurrentlyWorking: true,
      experienceDescription: 'Investigación en deep learning y procesamiento de lenguaje natural'
    },
    {
      firstName: 'Luis',
      lastName: 'Sánchez',
      email: 'luis.sanchez@email.com',
      phone: '+54 11 7777-4444',
      educationLevel: EducationLevel.UNIVERSITY,
      institution: 'Universidad de Palermo',
      degree: 'Licenciatura en Marketing Digital',
      graduationYear: 2019,
      currentPosition: 'Digital Marketing Manager',
      currentCompany: 'Digital Growth Agency',
      totalExperience: 4,
      startDate: new Date('2019-08-01'),
      isCurrentlyWorking: true,
      experienceDescription: 'Estrategias de marketing digital y gestión de campañas publicitarias'
    }
  ];

  for (const candidate of candidates) {
    await prisma.candidate.create({
      data: candidate
    });
  }

  console.log('Base de datos poblada con éxito!');
}

main()
  .catch((e) => {
    console.error('Error al poblar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 