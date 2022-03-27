import { PropTypes } from "prop-types";

const Button = (props) => {
  const { children, ...otherProps } = props;

  return (
    <>
      <button type="button" {...otherProps}>
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  otherProps: PropTypes.any,
};

export default Button;