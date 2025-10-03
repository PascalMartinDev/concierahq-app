
interface WebexPosContextProps {
  userName: string;
  locationId: string;
  deviceId: string;
}

const WebexPosContext: React.FC<WebexPosContextProps> = ({userName, locationId, deviceId }) => {
  return (
    <footer className="bg-gray-600">
      <div className="container mx-auto text-left">
        <div className="text-center">
          <p className="text-center py-4 text-grey-400 text-sm">
            User ID: {userName}<span className="mx-3">|</span>Device ID: {deviceId}<span className="mx-3">|</span>Location ID: {locationId}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default WebexPosContext;