
import { Alert, AlertTitle, Collapse } from "@mui/material";
import { useState, useEffect } from 'react';
import { FlashMessage as FM} from "../../types/flashmessage.type";
import event from '../../utils/event';

interface FlashMessageConfigs{
  message: FM
  visible: boolean
}

export default function FlashMessage() {

  const [state, setState] = useState<FlashMessageConfigs>({
    message: {
      msg: '',
      type: 'error',
      variant: 'filled',
      title: ''
    },
    visible: false
  })

  useEffect(() => {

    event.addListener('flash', (message: FM) => {
      setState({ message, visible: true });

    })

    let id = setTimeout(() => {
      setState({...state,  visible: false})

    }, 4000)

    // clear effect
    return clearTimeout(id)
    
  }, [])

  const { message, visible} = state
  const {msg, type, variant, title} = message

  return (
    <Collapse in={visible} style={{width: '100%'}}>
      <Alert
      style={{
        width: '100%',
        height: 'fit-content'
      }}
        onClose={(e) => { setState({...state, visible: false})}}
        variant={variant ?? "filled"}
        severity={type ?? "error"}
      >
        <AlertTitle>{title}</AlertTitle>
        {msg}
      </Alert>
    </Collapse>
  );
}