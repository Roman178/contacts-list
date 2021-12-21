/* eslint-disable */

import React, {
  FC,
  SyntheticEvent,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import userStore from "../store/user";
import css from "./SignIn.module.scss";

const EMAIL_INPUT = "emailInput";
const PASSWORD_INPUT = "passwordInput";

interface IInput {
  value: string;
  isValid: boolean | undefined;
}
interface IInputsNames {
  [EMAIL_INPUT]: IInput;
  [PASSWORD_INPUT]: IInput;
}

const SignIn: FC = () => {
  const { signIn, loadingUser } = userStore;

  const [validForm, setValidForm] = useState(false);
  const [inputs, setInputs] = useState<IInputsNames>({
    [EMAIL_INPUT]: {
      value: "",
      isValid: undefined,
    },
    [PASSWORD_INPUT]: {
      value: "",
      isValid: undefined,
    },
  });

  useEffect(() => {
    setValidForm(
      Object.values(inputs)
        .map((i: { isValid: boolean }) => i.isValid)
        .every((i) => i === true)
    );
  }, [inputs]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    signIn(inputs[EMAIL_INPUT].value, inputs[PASSWORD_INPUT].value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.validity.valid,
      },
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="email">
        Ваш email
        <input
          className={cn(css.input, {
            [css.inputInvalid]: inputs[EMAIL_INPUT].isValid === false,
          })}
          value={inputs[EMAIL_INPUT].value}
          required
          id="email"
          type="email"
          name={EMAIL_INPUT}
          onChange={handleChange}
          onFocus={(e) =>
            setInputs((prev) => ({
              ...prev,
              [EMAIL_INPUT]: {
                ...prev[EMAIL_INPUT],
                isValid: e.target.validity.valid,
              },
            }))
          }
        />
        <span
          className={cn(css.inputErrorValid, {
            [css.inputErrorInvalid]: inputs[EMAIL_INPUT].isValid === false,
          })}
        >
          Некорректный email
        </span>
      </label>
      <label htmlFor="password">
        Пароль
        <input
          className={cn(css.input, {
            [css.inputInvalid]: inputs[PASSWORD_INPUT].isValid === false,
          })}
          value={inputs[PASSWORD_INPUT].value}
          onChange={handleChange}
          id="password"
          type="password"
          name={PASSWORD_INPUT}
          pattern="^.{4,}$"
          required
          onFocus={(e) =>
            setInputs((prev) => ({
              ...prev,
              [PASSWORD_INPUT]: {
                ...prev[PASSWORD_INPUT],
                isValid: e.target.validity.valid,
              },
            }))
          }
        />
        <span
          className={cn(css.inputErrorValid, {
            [css.inputErrorInvalid]: inputs[PASSWORD_INPUT].isValid === false,
          })}
        >
          Пароль должен быть не менее 4 символов
        </span>
      </label>
      <button disabled={!validForm} type="submit">
        Войти
      </button>
    </form>
  );
};

export default observer(SignIn);
