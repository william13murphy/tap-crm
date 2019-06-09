const generatedNames = [
  {
    Name: 'Pat Nimmons',
    Email: 'pat@nimmons.com',
  },
  {
    Name: 'Rosella Fiorentino',
    Email: 'rosella@fiorentino.com',
  },
  {
    Name: 'Hermelinda Smale',
    Email: 'Hermelinda@Smale.com',
  },
  {
    Name: 'Stacey Amoroso',
    Email: 'Stacey@Amoroso.com',
  },
  {
    Name: 'Gustavo Schaller',
    Email: 'Gustavo@Schaller.com',
  },
  {
    Name: 'Maxwell Steier',
    Email: 'Maxwell@Steier.com',
  },
  {
    Name: 'Melissa Reisr',
    Email: 'Melissa@Reisr.com',
  },
  {
    Name: 'Sabine Langer',
    Email: 'Sabine@Langer.com',
  },
  {
    Name: 'Wes Nicosia',
    Email: 'Wes@Nicosia.com',
  },
  {
    Name: 'Gwen Croslin',
    Email: 'Gwen@Croslin.com',
  },
  {
    Name: 'Lucina Marnell',
    Email: 'Lucina@Marnell.com',
  },
  {
    Name: 'Darline Kovacich',
    Email: 'Darline@Kovacich.com',
  },
  {
    Name: 'Teodora Stewart',
    Email: 'Teodora@Stewart.com',
  },
  {
    Name: 'Marci Petersen',
    Email: 'Marci@Petersen.com',
  },
  {
    Name: 'Kirsten Skow',
    Email: 'Kirsten@Skow.com',
  },
  {
    Name: 'Nadene Muscarella',
    Email: 'Nadene@Muscarella.com',
  },
  {
    Name: 'Sebrina Zaccaria',
    Email: 'Sebrina@Zaccaria.com',
  },
  {
    Name: 'Berna Houtz',
    Email: 'Berna@Houtz.com',
  },
  {
    Name: 'Valarie Kinsel',
    Email: 'Valarie@Kinsel.com',
  },
  {
    Name: 'Desmond Rosario',
    Email: 'Desmond@Rosario.com',
  },
  {
    Name: 'Ruthanne Dowd',
    Email: 'Ruthanne@Dowd.com',
  },
  {
    Name: 'Beckie Weinstein',
    Email: 'Beckie@Weinstein.com',
  },
  {
    Name: 'Bev Courson',
    Email: 'Bev@Courson.com',
  },
  {
    Name: 'Therese Yeh',
    Email: 'Therese@Yeh.com',
  },
];

const generatedClients = [];

for (let i = 0; i < 100; i++) {
  let randomPerson = parseInt(Math.random() * (generatedNames.length - 1) + 0);
  let randomNumber1 = parseInt(Math.random() * 799 + 200);
  let randomNumber2 = parseInt(Math.random() * 899 + 100);
  let randomNumber3 = parseInt(Math.random() * 8999 + 1000);

  generatedClients.push({
    Id: i,
    Name: generatedNames[randomPerson].Name,
    Email: generatedNames[randomPerson].Email,
    PrimaryPhone: `(${randomNumber1}) ${randomNumber2}-${randomNumber3}`,
  });
}

export default generatedClients;
