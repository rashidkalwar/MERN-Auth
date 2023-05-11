const Loading = () => {
  return (
    <div className="border border-slate-200 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-24">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-6 w-[250px] mx-auto bg-slate-300 rounded my-8"></div>
          <div className="space-y-2">
            <div className="h-12 bg-slate-300 rounded"></div>
            <div className="h-12 bg-slate-300 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-3 bg-slate-300 rounded col-span-2"></div>
            <div className="h-3 bg-slate-300 rounded col-span-1"></div>
          </div>
          <div className="h-10 mx-auto bg-slate-300 rounded w-[200px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
