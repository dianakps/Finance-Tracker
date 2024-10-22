"use client";

function Navbar() {
  return (
    <>
      <header className="container max-w-2xl px-6 py-6 mx-auto">
        <div className=" flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
              <img
                src="https://thispersondoesnotexist.com/"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <p class="text-lg font-semibold"> Hello !</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
