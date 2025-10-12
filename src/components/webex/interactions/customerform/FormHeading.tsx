type FormHeadingProps = {
  title: string;
};

const FormHeading: React.FC<FormHeadingProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 m-6">
            {title}
      </h2>
    </div>
  )
}

export default FormHeading;