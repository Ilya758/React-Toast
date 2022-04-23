import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { initializeToastify } from '@src/utils/initializeToastify';
import { IForm, TUser } from './Form.types';

const Form = ({ className }: IForm) => {
  const userInputs = {
    fullName: '',
    role: '',
    file: '',
    skills: [],
    birthday: '',
    city: '',
    email: '',
    agreed: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUser>({
    defaultValues: userInputs,
  });

  const { generateSuccessfulToast } = initializeToastify();

  const onSubmit: SubmitHandler<TUser> = () => {
    generateSuccessfulToast({
      content: "Your data's been successfully submitted!",
      animationType: 'zoom',
      lifetime: 5000,
    });

    reset();
  };

  const regEmail = /^[a-zA-Z.]{3}\.?[\d\w\.]{0,12}@[a-z]{2,}.[a-zA-Z]{2,}$/gi;

  const isTodayTheDayBefore = (date: string) =>
    Date.now() > new Date(date).getTime();

  return (
    <>
      <main>
        <form className={className + ' form'}>
          <h1 className="form__heading">Your personal form</h1>
          <div>
            <span className="field__heading">Type your fullname: </span>
            <input
              defaultValue=""
              {...register('fullName', { required: true, minLength: 2 })}
              className="input"
              placeholder="Fullname"
              type="text"
            />
            {errors.fullName && (
              <p className="error">
                Please, consider that your name should have at least 2 symbols
              </p>
            )}
          </div>

          <div>
            <span className="field__heading">Choose your gender: </span>
            <span className="span_margin_right">
              <label>
                <input
                  defaultChecked={false}
                  {...register('role', { required: true })}
                  className="with-gap"
                  name="role"
                  type="radio"
                  value="male"
                />
                <span>Male</span>
              </label>
            </span>
            <span>
              <label>
                <input
                  defaultChecked={false}
                  {...register('role', { required: true })}
                  className="with-gap"
                  name="role"
                  type="radio"
                  value="female"
                />
                <span>Female</span>
              </label>
            </span>
            {errors.role && (
              <p className="error">
                Please, consider that you should choose a role
              </p>
            )}
          </div>

          <div>
            <span className="field__heading">Choose your skills: </span>
            <span className="span_margin_right">
              <label>
                <input
                  className="checkbox_type_skills"
                  defaultChecked={false}
                  {...register('skills', { required: true })}
                  type="checkbox"
                  name="skills"
                  value="html"
                />
                <span>HTML</span>
              </label>
            </span>
            <span className="span_margin_right">
              <label>
                <input
                  defaultChecked={false}
                  {...register('skills', { required: true })}
                  className="checkbox_type_skills"
                  type="checkbox"
                  name="skills"
                  value="css"
                />
                <span>CSS</span>
              </label>
            </span>
            <span className="span_margin_right">
              <label>
                <input
                  defaultChecked={false}
                  {...register('skills', { required: true })}
                  className="checkbox_type_skills"
                  type="checkbox"
                  name="skills"
                  value="js"
                />
                <span>JS</span>
              </label>
            </span>
            {errors.skills && (
              <p className="error">Please, choose your personal skills</p>
            )}
          </div>

          <div>
            <label className="field__heading" htmlFor="date">
              Choose your birthday:
            </label>
            <input
              defaultValue=""
              {...register('birthday', {
                validate: isTodayTheDayBefore,
                required: true,
              })}
              className="input"
              id="date"
              type="date"
            />
            {errors.birthday && (
              <p className="error">Please, type your birthday correctly!</p>
            )}
          </div>

          <div>
            <span className="field__heading">Type your email: </span>
            <input
              defaultValue=""
              {...register('email', { pattern: regEmail, required: true })}
              className="input"
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <p className="error">
                Please, be sure you enter a correct email-address
              </p>
            )}
          </div>

          <div>
            <label className="input__container">
              <span className="field__heading">I agree with the terms</span>
              Disagree
              <input
                defaultValue=""
                {...register('agreed', { required: true })}
                className="slider__input"
                type="checkbox"
              />
              <span className="slider">
                <span className="thumb"></span>
              </span>
              Agree
            </label>
            {errors.agreed && (
              <p className="error">
                Please, confirm that you have been agreed with the terms
              </p>
            )}
          </div>

          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="button_type_submit"
            >
              Submit the form!
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Form;
