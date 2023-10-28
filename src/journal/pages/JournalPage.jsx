
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';


export const JournalPage = () => {
  return (
    
    <JournalLayout>

      {/* <Typography>Excepteur laboris consequat consequat eu ullamco. Qui esse consequat incididunt sunt Lorem amet incididunt elit ex aliquip sint excepteur. Ex occaecat velit voluptate velit aliquip ex commodo minim ea. Labore deserunt cupidatat sunt mollit culpa sunt culpa culpa. In laborum aliquip aliquip eiusmod id mollit cillum aute ad nostrud sunt anim laborum. Proident adipisicing incididunt cupidatat ullamco mollit. Exercitation sint dolore deserunt sit sint est.</Typography> */}

      {/* NothinSelected */}
      <NothingSelectedView/>

      {/* NoteView */}
      {/* <NoteView/> */}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>

    </JournalLayout>

  )
}
