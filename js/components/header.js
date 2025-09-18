function getHeader() {
    return `
  <header class="first flex items-center mb-[40px] mt-[40px] ml-[20px] mr-[20px] gap-[35px]">
    <div class="left flex justify-between gap-[40px]">
      <div class="logo-box w-[175px] h-[40px]">
        <a href="./index.html">
          <img src="./img/logo_b1x3-5c.png" alt="" class="w-full h-full">
        </a>
      </div>

      <!-- Каталог -->
      <div class="kataloq relative z-50 w-[140px] h-[40px] rounded-[20px] bg-red-500 text-white flex items-center justify-center text-center cursor-pointer">
        <div class="iconBox w-[25px] flex flex-wrap mr-[5px]">
          <i class="fa-regular fa-square text-white mt-[2px] text-[8px] font-bold text-2xl"></i>
          <i class="fa-regular fa-square text-white mt-[2px] text-[8px] font-bold text-2xl"></i>
          <i class="fa-regular fa-square text-white mt-[2px] text-[8px] font-bold text-2xl"></i>
          <i class="fa-regular fa-square text-white mt-[2px] text-[8px] font-bold text-2xl"></i>
        </div>
        <div class="closeIcon hidden text-white font-bold text-2xl text-center mr-[15px] mb-[3px]">&times;</div>
        Kataloq
      </div>

      <!-- Модалка -->
      <div id="catalogModal" style="background-color: rgba(128,128,128,0.5);" class="fixed inset-0 items-center justify-center z-40 hidden">
        <div class="bg-white rounded-[20px] p-6 w-[1220px] h-[450px] mt-[100px] ml-[20px] mr-[20px] relative">
          <h2 class="text-xl font-bold mb-4">Каталог</h2>
          <p>Здесь будет содержимое каталога...</p>
        </div>
      </div>
    </div>

    <input id="inpBox" class="w-[500px] h-[40px] border rounded-[20px] p-[10px]" type="search" placeholder="Növbəti kitabınızı axtarın">

    <div class="right flex justify-center items-center gap-[20px]">
      <div id="langBox">
        <select name="lang" id="lang">AZ</select>
      </div>

      <div id="openModal" class="cursor-pointer w-[140px] h-[40px] rounded-[20px] flex justify-center items-center gap-[10px] bg-white text-[18px] px-[20px] py-[10px] relative">
        <i class="fa-regular fa-circle-user text-[20px]"></i> Hesabim <i class="fa-solid fa-angle-down"></i>
      </div>

      <div id="login-dropdown" class="hidden absolute top-[100%] left-0 w-[350px] border rounded-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-[1000]">
        <div class="top-section bg-white p-[20px] flex flex-col justify-around gap-[20px] rounded-tr-[20px] rounded-tl-[20px]">
          <a class="text-black text-[16px] font-medium" href="#">Sifarişlər</a>
          <a class="text-black text-[16px] font-medium" href="#">Qaytarma sorguları</a>
          <a class="text-black text-[16px] font-medium" href="#">Seçilmişlər</a>
        </div>
        <div class="bottom-section bg-white p-[20px] text-gray-400 rounded-br-[20px] rounded-bl-[20px]">
          <label class="block mb-[5px]">Sifarişi izləmək</label>
          <input class="w-[100%] p-[8px] mb-[10px] border rounded-[5px]" type="text" placeholder="Sifariş nömrəsi / E-poçt">
          <div class="buttons flex justify-between gap-[10px]">
            <a href="./pages/admin.html" class="btn-login px-[10px] py-[12px] border rounded-[20px] cursor-pointer font-bold text-white bg-black text-center inline-block">
              Admin Panel
            </a>
            <button class="btn-register px-[10px] py-[12px] border rounded-[20px] cursor-pointer font-bold text-white bg-red-700">
              Qeydiyyat
            </button>
          </div>
        </div>
      </div>

        <div id="wishList">
            <a href="./pages/wishList.html"><i class="fa-regular fa-heart"></i></a>

            <span class="tooltip">Seçilmiş məhsulların siyaxısına baxın</span>
        </div>
        <div id="bascketBox" class="cursor-pointer">
            <i class="fa-solid fa-basket-shopping text-[24px]"></i>
        </div>
    </div>
  </header>

  <header class="second flex justify-between ml-[20px] mr-[20px] mb-[20px]">
    <div class="left text-black flex gap-[20px]">
      <p><a href="#">Bestseller – İyul</a></p>
      <p><a href="#">Endirimlər</a></p>
      <p><a href="#">Müəlliflər</a></p>
      <p><a href="#">Klassiklər</a></p>
    </div>
    <div class="right text-[#727272] flex gap-[20px]">
      <p><a href="#">Ödəniş və çatdırılma</a></p>
      <p><a href="#">Loyallıq Kartı</a></p>
      <p><a href="#">FAQ</a></p>
      <p><a href="#">Əlaqə</a></p>
    </div>
  </header>

  `;
}

export default getHeader;
