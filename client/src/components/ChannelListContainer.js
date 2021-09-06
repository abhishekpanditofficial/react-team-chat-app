import React, { useState } from 'react';
import { ChannelList, useChatContext} from 'stream-chat-react';
import {ChannelSearch,TeamChannelList,TeamChannelPreview} from './';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Sidebar =({logout}) =>(
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
              <div className='icon1__inner'>
                <img src={HospitalIcon} alt="Hospital" width="30" />
              </div>
        </div>
        <div className="channel-list__sidebar__icon2">
              <div className='icon1__inner' onClick={logout}>
                <img src={LogoutIcon} alt="Hospital" width="30" />
              </div>
        </div>
    </div>
)

const CompanyHeader = () =>{
    return(
    <div className='channel-list__header'>
        <p className="channel-list__header__text">WFT TEAM</p>
    </div>
    );
}

const customChannelTeamFilter= (channels) =>{
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter= (channels) =>{
  return channels.filter((channel) => channel.type === 'messaging');
}

function ChannelListContent({ isCreating, setIsCreating,setCreateType,setIsEditing,setToggleContainer}) {
  const {client} = useChatContext();

  const logout= () =>{
     cookies.remove('token');
     cookies.remove('userId');
     cookies.remove('username');
     cookies.remove('fullName');
     cookies.remove('avatarURL');
     cookies.remove('hashedPassword');
     cookies.remove('phoneNumber');

     window.location.reload();
  }

  const filters= {members: {$in : [client.userID]}}

    return (
       <>
          <Sidebar logout={logout}/>
          <div className="channel-list__list__wrapper">
              <CompanyHeader />
              <ChannelSearch setToggleContainer={setToggleContainer} />
              <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelTeamFilter}
                List={(listProps) => (
                    <TeamChannelList 
                    isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing}
                    {...listProps} type="team"  setToggleContainer={setToggleContainer}/>
                )}
                Preview={(previewProps) =>(
                  <TeamChannelPreview
                  setIsCreating={setIsCreating}
                  setIsEditing={setIsEditing}
                 {...previewProps}
                 setToggleContainer={setToggleContainer}
                 type="team"
                  />
                )}
                />
                 <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelMessagingFilter}
                List={(listProps) => (
                    <TeamChannelList 
                    isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing}
                    {...listProps} type="messaging" setToggleContainer={setToggleContainer} />
                )}
                Preview={(previewProps) =>(
                  <TeamChannelPreview
                  setIsCreating={setIsCreating}
                  setIsEditing={setIsEditing}
                  setToggleContainer={setToggleContainer}
                 {...previewProps}
                 type="messaging"
                  />
                )}
                />
          </div>
       </>
    )
}

const ChannelListContainer =({setCreateType,setIsCreating,setIsEditing,isCreating}) =>{
   const [toggleContainer,setToggleContainer]= useState(false);

   return (
   <>
      <div className="channel-list__container">
        <ChannelListContent
        isCreating={isCreating}  setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing}
        />
      </div>

    <div className="channel-list__container-responsive"
      style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
     >
       <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggle) => !prevToggle)}>
     </div>
     <ChannelListContent
     setToggleContainer={setToggleContainer}
     isCreating={isCreating}  setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing}
     />
     </div>
      </>
   );
}

export default ChannelListContainer
