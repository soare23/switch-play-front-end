import { React } from 'react';

export default function EditableFields({
  userInfo,
  inputName,
  editable,
  updateField,
}) {
  let input = (
    <input
      type="text"
      defaultValue={userInfo}
      onChange={getData}
      name={inputName}
    ></input>
  );

  function getData(e) {
    e.preventDefault();
    updateField(e.target.value, inputName);
  }

  return (
    <div style={{ marginLeft: '10px' }}>
      {editable === true ? input : userInfo}
    </div>
  );
}
