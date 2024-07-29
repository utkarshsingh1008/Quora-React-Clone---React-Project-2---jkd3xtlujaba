import { useNavigate,Link} from 'react-router-dom';
import globe from  '../assets/Globe.jpg';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
  } from "@material-tailwind/react";
import { toast } from 'react-toastify';

const LanguageMenu = () => {
  const navigate=useNavigate();

  const notify=()=>{
    toast("Feature under Development",{autoClose:500})
  }
    return (
        <Menu>
          <MenuHandler>
            <img
              className="cursor-pointer w-7 h-7 rounded-full ml-4 mt-1"
              src={globe}
            />
            {/* <Globe/> */}
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2" onClick={notify}>
              <div  variant="small" className="font-medium">
                English  
              </div>
            </MenuItem>
            <MenuItem className="flex items-center gap-2" onClick={notify}>
              <div variant="small" className="font-medium"  >
                Telugu  
              </div>
            </MenuItem>
            <MenuItem className="flex items-center gap-2" onClick={notify}>
              <div  variant="small" className="font-medium">
                See all languages
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      );
}

export default LanguageMenu