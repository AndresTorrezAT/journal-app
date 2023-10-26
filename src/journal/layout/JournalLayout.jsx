import { Box } from '@mui/material'; // revisar esto parece que es /system
import { NavBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

      {/* Navbar drawerWidth*/}

      <NavBar drawerWidth={ drawerWidth } />

      {/* Sidebar drawerWidth*/}

      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* Toolbar */}

        { children }

      </Box>

    </Box>
  )
}
