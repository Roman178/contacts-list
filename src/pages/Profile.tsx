// /* eslint-disable */
import React, {
  FC,
  useEffect,
  useCallback,
  SyntheticEvent,
  useState,
  ChangeEvent,
} from "react";
import contactsStore from "../store/contacts";
import { observer } from "mobx-react-lite";

interface IInputsNames {
  contactName: string;
  contactTel: string;
}

const Profile: FC = () => {
  const { getContacts, contacts, addContact } = contactsStore;

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const [inputs, setInputs] = useState<IInputsNames>({
    contactName: "",
    contactTel: "",
  });

  const handleAddContact = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      addContact({ name: inputs.contactName, tel: inputs.contactTel });
    },
    [addContact, inputs.contactName, inputs.contactTel]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    },
    [inputs]
  );

  return (
    <div>
      <form onSubmit={handleAddContact}>
        <label htmlFor="name">
          Имя
          <input
            onChange={handleChange}
            name="contactName"
            id="name"
            type="text"
          />
        </label>
        <label htmlFor="tel">
          Телефон
          <input
            onChange={handleChange}
            name="contactTel"
            id="tel"
            type="tel"
          />
        </label>
        <button disabled={!Object.values(inputs).every((i) => i)} type="submit">
          add
        </button>
      </form>
      <ul>
        {contacts?.map((c) => (
          <li key={c.id}>
            <span>{c.name}</span>
            <span>{c.tel}</span>
            <button>delete</button>
            <button>edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(Profile);
