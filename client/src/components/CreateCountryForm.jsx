import { useMutation, gql } from '@apollo/client';

import '../styles/createCountryForm.css';

const CREATE_COUNTRY = gql`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      code
      name
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

function CreateCountryForm() {
  const [createCountry] = useMutation(CREATE_COUNTRY);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCountry = {
        code: e.target.code.value,
        name: e.target.name.value,
        language: e.target.language.value,
        continent: e.target.continent.value,
      };

      const { data } = await createCountry({
        variables: {
          input: newCountry,
        },
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='container-form'>
      <h1 className='title-form'>
        Crea un pais
      </h1>
      <div className='box1'>
        <label>Codigo</label>
      <input type="text" name="code" placeholder="Country Code" />
      <label>Nombre</label>
      <input type="text" name="name" placeholder="Country Name" />
      </div>
      <div className='box2'>
        <label>Lenguaje</label>
      <input type="text" name="language" placeholder="Language" />
      <label>Continente </label>
      <input type="text" name="continent" placeholder="Continent" />
      </div>
      <button type="submit">Create Country</button>
    </form>
  );
}

export default CreateCountryForm;
