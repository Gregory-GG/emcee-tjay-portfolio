import {
  faBriefcase,
  faPeopleGroup,
  faRing,
  faGraduationCap,
  faMasksTheater,
  faFire,
  faStar,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';

// Service icons are stored in db.json by Font Awesome name. Add new ones here.
const serviceIcons = {
  briefcase: faBriefcase,
  'people-group': faPeopleGroup,
  ring: faRing,
  'graduation-cap': faGraduationCap,
  'masks-theater': faMasksTheater,
  fire: faFire,
  star: faStar,
};

export function serviceIcon(name) {
  return serviceIcons[name] || faMicrophone;
}
