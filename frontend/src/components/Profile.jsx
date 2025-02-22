import Avatar from "./Avatar";

const Profile = ({ selectedUser, onlineUsers, setShowProfile }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowProfile(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">×</span>
        </button>
      </div>

      <div className="flex flex-col items-center">
        <Avatar
          user={selectedUser}
          onlineUsers={onlineUsers}
          profileSize={"size-24"}
        />

        <div className="flex flex-col items-center mt-4 text-sm gap-1">
          <h3 className="text-xl font-medium mb-1">{selectedUser.name}</h3>
          <p className="text-[#707991]">+91 1234567890</p>
          <p className="text-[#707991] mb-4">{selectedUser.email}</p>
        </div>
        <div className="border-b border-[#D9DCE0] w-full"></div>
      </div>
    </div>
  );
};

export default Profile;
