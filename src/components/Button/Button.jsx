
import React from "react";
import PropTypes from "prop-types";
import { ButtonLoreMore } from "./Button.styled";

const Button = ({ onClick, disabled, showMoreButton }) => {
  return (
    // Renderizar el botón solo si showMoreButton es verdadero
    // Esto ayuda a mantener un componente más limpio y evitar renderizaciones innecesarias
    <>
    {showMoreButton && (
      <ButtonLoreMore onClick={ onClick } disabled={ disabled }>
        Load More
      </ButtonLoreMore>
    )}
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  showMoreButton: PropTypes.bool.isRequired,
};

export default Button;
