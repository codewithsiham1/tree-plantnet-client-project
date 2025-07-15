import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../MenuItem/MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { MdOutlineContactMail } from 'react-icons/md'; 

const AdminMenu = () => {
  return (
    <>
       <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
         <MenuItem
        icon={MdOutlineContactMail}
        label="Contact Messages"
        address="/dashboard/contact-message"
      />
    </>
  )
}

export default AdminMenu