/* eslint-disable */
import React, {
  FC,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
  useState,
} from "react";
import contactsStore from "../store/contacts";
import { observer } from "mobx-react-lite";
import { IContact } from "../store/contacts";
import css from "./Profile.module.scss";

interface IInputsNames {
  addName: string;
  addTel: string;
  updateName: string;
  updateTel: string;
}

const Profile: FC = () => {
  const {
    getContacts,
    contacts,
    addContact,
    deleteContact,
    updateContact,
    loading,
  } = contactsStore;
  const [contactIdEditMode, setContactIdEditMode] = useState(null);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const [inputs, setInputs] = useState<IInputsNames>({
    addName: "",
    addTel: "",
    updateName: "",
    updateTel: "",
  });

  const handleAddContact = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      try {
        e.preventDefault();
        await addContact({ name: inputs.addName, tel: inputs.addTel });
        setInputs({ ...inputs, addName: "", addTel: "" });
      } catch (error) {
        console.error(error);
      }
    },
    [addContact, inputs]
  );

  const handleDeleteContact = useCallback(
    async (contact: IContact): Promise<void> => {
      try {
        await deleteContact(contact.id);
      } catch (error) {
        console.error(error);
      }
    },
    [deleteContact]
  );

  const handleUpdateContact = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      try {
        e.preventDefault();

        updateContact({
          id: contactIdEditMode,
          name: inputs.updateName,
          tel: inputs.updateTel,
        });
        setContactIdEditMode(null);
      } catch (error) {
        console.error(error);
      }
    },
    [contactIdEditMode, inputs.updateName, inputs.updateTel, updateContact]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.type === "tel" && !e.target.value.match(/^(\s*|\d+)$/))
        return;

      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    },
    [inputs]
  );

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <form className={css.addForm} onSubmit={handleAddContact}>
            <p className={css.subtitle}>Добавить новый контакт</p>
            <label className={css.labelAdd} htmlFor="addName">
              Имя
              <input
                value={inputs.addName}
                onChange={handleChange}
                name="addName"
                id="addName"
                type="text"
                className={css.inputAdd}
              />
            </label>
            <label className={css.labelAdd} htmlFor="addTel">
              Телефон
              <input
                value={inputs.addTel}
                onChange={handleChange}
                name="addTel"
                id="addTel"
                type="tel"
                className={css.inputAdd}
              />
            </label>
            <button
              disabled={![inputs.addName, inputs.addTel].every((i) => i)}
              type="submit"
              className={css.btn}
            >
              Add
            </button>
          </form>
          <ul className={css.list}>
            <p className={css.subtitle}>Список контактов</p>
            {contacts?.map((c) => (
              <li className={css.listItem} key={c.id}>
                {contactIdEditMode === c.id ? (
                  <form onSubmit={handleUpdateContact}>
                    <label htmlFor="updateName">
                      <input
                        value={inputs.updateName}
                        onChange={handleChange}
                        name="updateName"
                        id="updateName"
                        type="text"
                      />
                    </label>
                    <label htmlFor="updateTel">
                      <input
                        value={inputs.updateTel}
                        onChange={handleChange}
                        name="updateTel"
                        id="updateTel"
                        type="tel"
                      />
                    </label>
                    <button className={css.btn} type="submit">
                      save
                    </button>
                  </form>
                ) : (
                  <>
                    <span className={css.name}>{c.name}</span>
                    <span className={css.tel}>{c.tel}</span>
                    <button
                      className={css.btnDelete}
                      onClick={() => handleDeleteContact(c)}
                    >
                      Delete
                    </button>
                    <button
                      className={css.btn}
                      onClick={() => {
                        setInputs({
                          ...inputs,
                          updateName: c.name,
                          updateTel: c.tel,
                        });
                        setContactIdEditMode(c.id);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default observer(Profile);
