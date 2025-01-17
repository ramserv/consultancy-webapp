type TileProps = {
  tileImage: string;
  tileText: string;
};

export const Tile = (props: TileProps) => {
  return (
    <>
      <div className="relative flex flex-col items-center group">
        <div className="relative w-70 sm:w-52 h-75 overflow-hidden rounded-lg">
          <img
            src={props.tileImage}
            alt="Tile"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg transition-all duration-300"></div>
        </div>
        <div className="absolute text-3xl font-bold text-white px-3 py-4 inset-0">
          {props.tileText}
        </div>
      </div>
    </>
  );
};
