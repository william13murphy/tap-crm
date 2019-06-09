import moment from 'moment';

export default [
  {
    title: 'Beginners Karate',
    start: new Date(new moment().startOf('day').add(6, 'hours')),
    end: new Date(new moment().startOf('day').add(7.5, 'hours')),
    type: 'Karate',
  },
  {
    title: 'Intermediate Karate',
    start: new Date(new moment().startOf('day').add(12, 'hours')),
    end: new Date(new moment().startOf('day').add(13.5, 'hours')),
    type: 'Karate',
  },
  {
    title: 'Black Belt Club Karate',
    start: new Date(new moment().startOf('day').add(19, 'hours')),
    end: new Date(new moment().startOf('day').add(21, 'hours')),
    desc: 'Advanced Students Only',
    type: 'Karate BBC',
  },
  {
    title: 'Beginners BJJ',
    start: new Date(new moment().startOf('day').add(17, 'hours')),
    end: new Date(new moment().startOf('day').add(18.5, 'hours')),
    type: 'BJJ',
  },
  {
    title: 'Intermediate BJJ',
    start: new Date(new moment().startOf('day').add(12, 'hours')),
    end: new Date(new moment().startOf('day').add(14, 'hours')),
    type: 'BJJ',
  },
  {
    title: 'Black Belt Club BJJ',
    start: new Date(new moment().startOf('day').add(19, 'hours')),
    end: new Date(new moment().startOf('day').add(21, 'hours')),
    type: 'BJJ BBC',
  },
  {
    title: 'Intermediate Karate',
    start: new Date(new moment().startOf('day').add(19, 'hours')),
    end: new Date(new moment().startOf('day').add(20, 'hours')),
    type: 'Karate',
  },
  {
    title: 'Muay Thai: Beginner / Intermediate',
    start: new Date(new moment().startOf('day').add(6, 'hours')),
    end: new Date(new moment().startOf('day').add(7.5, 'hours')),
    type: 'Muay Thai',
  },
  {
    title: 'Muay Thai: Advanced',
    start: new Date(new moment().startOf('day').add(17, 'hours')),
    end: new Date(new moment().startOf('day').add(18.5, 'hours')),
    type: 'Muay Thai',
  },
  {
    title: 'Muay Thai: Beginner / Intermediate',
    start: new Date(new moment().startOf('day').add(12, 'hours')),
    end: new Date(new moment().startOf('day').add(13, 'hours')),
    type: 'Muay Thai',
  },
  // {
  //   title: 'Demonstration Saturdays',
  //   allDay: true,
  //   start: new Date(),
  //   end: new Date(),
  //   type: 'Demo',
  // },
];
