import { Field, ErrorMessage } from 'formik';


const FormInput = ({ label, name, placeholder = '', type = 'text' }: { label: string; name: string; placeholder?: string; type?: string }) => (
    <div>
        <label htmlFor={name} className='block w-full text-gray-600 font-medium text-sm mb-1'>{label}</label>
        <Field type={type} id={name} name={name} placeholder={placeholder} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500' />
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
);

export default FormInput;