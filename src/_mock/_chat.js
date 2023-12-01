import { sub } from 'date-fns';
import cloneDeep from 'lodash/cloneDeep';
import uuidv4 from 'src/utils/uuidv4';
import { _mock } from './_mock';
import { _files } from './_files';

const MY_CONTACT = {
  status: 'online',
  id: '8864c717-587d-472a-929a-8e5f298024da-0',
  role: 'admin',
  email: 'demo@minimals.cc',
  name: 'Jaydon Frankie',
  lastActivity: new Date(),
  address: '90210 Broadway Blvd',
  avatarUrl: _mock.image.avatar(24),
  phoneNumber: '+40 777666555',
};

const _contacts = [...Array(20)].map((_, index) => {
  const status =
    (index % 2 && 'online') || (index % 3 && 'offline') || (index % 4 && 'alway') || 'busy';

  return {
    status,
    id: _mock.id(index),
    role: _mock.role(index),
    email: _mock.email(index),
    name: _mock.fullName(index),
    lastActivity: _mock.time(index),
    address: _mock.fullAddress(index),
    avatarUrl: _mock.image.avatar(index),
    phoneNumber: _mock.phoneNumber(index),
  };
});

const _conversations = [
  {
    id: _contacts[1].id,
    participants: [MY_CONTACT, _contacts[1]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: uuidv4(),
        body: _mock.sentence(1),
        contentType: 'text',
        attachments: _files.slice(0, 1),
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: _contacts[1].id,
      },
      {
        id: uuidv4(),
        body: _mock.sentence(2),
        contentType: 'text',
        attachments: _files.slice(1, 2),
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.sentence(3),
        contentType: 'text',
        attachments: _files.slice(2, 3),
        createdAt: sub(new Date(), { minutes: 8 }),
        senderId: _contacts[1].id,
      },
      {
        id: uuidv4(),
        body: _mock.sentence(4),
        contentType: 'text',
        attachments: _files.slice(3, 6),
        createdAt: sub(new Date(), { minutes: 6 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.sentence(5),
        contentType: 'text',
        attachments: _files.slice(6, 10),
        createdAt: sub(new Date(), { minutes: 4 }),
        senderId: _contacts[1].id,
      },
      {
        id: uuidv4(),
        attachments: [],
        contentType: 'image',
        body: _mock.image.cover(4),
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: _contacts[1].id,
      },
      {
        id: uuidv4(),
        contentType: 'text',
        attachments: [],
        body: _mock.sentence(6),
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id,
      },
      {
        id: uuidv4(),
        body: _mock.sentence(7),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id,
      },
    ],
  },
  // ... (rest of the _conversations array)
];

let data = _conversations;

export function getData() {
  return cloneDeep(data);
}

export function saveData(newData) {
  const reduceItems = Object.values(
    newData.reduce((accumulator, current) => {
      if (!accumulator[current.id]) {
        accumulator[current.id] = current;
      } else {
        accumulator[current.id] = { ...accumulator[current.id], ...current };
      }
      return accumulator;
    }, {})
  );

  data = reduceItems;
}
