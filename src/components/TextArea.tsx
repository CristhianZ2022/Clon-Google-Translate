import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void 
  value: string 
}

const commonStyles = { border: 0, height : '200px', resize: 'none' };

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Type here...';
  if (loading) return 'Translating...';
  return 'Translated text...';
}

export const TextArea = ({ type, loading, onChange, value }: Props) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: 'lightgray' };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  }

  return (
    <Form.Control
      as='textarea'
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      onChange={handleChange}
      placeholder={getPlaceholder({ type, loading })}
      value={value}
      style={styles}
    />
  )
}