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
];
