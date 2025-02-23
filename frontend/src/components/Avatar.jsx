const Avatar = ({ user, profileSize, onlineUsers }) => {
  console.log(`user._id = ${user._id}`);
  console.log(`onlineUsers = ${onlineUsers}`);
  return (
    <div className="relative mx-auto lg:mx-0">
      <div className={`${profileSize ? profileSize : "size-14"} rounded-full bg-primary flex items-center justify-center bg-[#6E80A4] text-white`}>
        <span className="text-primary-content text-lg font-medium">
          {user.name.split(' ').slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('')}
        </span>
      </div>
      {onlineUsers?.includes(user._id) && (
        <span className="absolute top-0 right-1 size-3 bg-green-500 rounded-full outline-2 outline-white"></span>
      )}
    </div >
  );
};

export default Avatar;
