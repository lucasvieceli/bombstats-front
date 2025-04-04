"use-client";
import { VARIANTS_MENU_ITEM } from "@/components/Menu/MenuItem";
import { getCookie, setCookie } from "@/util/cookie";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const locales = [
  {
    name: "English",
    value: "en-US",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="w-6"
        viewBox="0 0 7410 3900"
      >
        <path fill="#b22234" d="M0 0h7410v3900H0z" />
        <path
          stroke="#fff"
          strokeWidth={300}
          d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
        />
        <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
        <g fill="#fff">
          <g id="d">
            <g id="c">
              <g id="e">
                <g id="b">
                  <path
                    id="a"
                    d="m247 90 70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                  />
                  <use xlinkHref="#a" y={420} />
                  <use xlinkHref="#a" y={840} />
                  <use xlinkHref="#a" y={1260} />
                </g>
                <use xlinkHref="#a" y={1680} />
              </g>
              <use xlinkHref="#b" x={247} y={210} />
            </g>
            <use xlinkHref="#c" x={494} />
          </g>
          <use xlinkHref="#d" x={988} />
          <use xlinkHref="#c" x={1976} />
          <use xlinkHref="#e" x={2470} />
        </g>
      </svg>
    ),
  },
  {
    name: "O brabo",
    value: "pt-BR",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6"
        fillRule="evenodd"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 100000 70000"
      >
        <path fill="#00923F" d="M0 0h100000v70000H0z" />
        <path
          fill="#F8C300"
          d="M50000 8500 8500 35000l41500 26500 41500-26500L50000 8500z"
        />
        <circle cx={49963} cy={35000} r={17464} fill="#28166F" />
        <path
          fill="#FFF"
          d="m51733 38767 211 533 571 36-440 366 141 555-483-307-484 307 142-555-441-366 571-36 212-533zm13056 1864 180 454 487 31-376 312 121 472-412-261-413 261 121-472-375-312 487-31 180-454zm-1869 1447 212 532 571 37-441 365 142 555-484-306-484 306 142-555-441-365 572-37 211-532zm-693-1873 251 631 677 44-522 433 168 657-574-363-573 363 168-657-522-433 677-44 250-631zm-134 3262 211 532 572 36-441 366 142 555-484-307-484 307 142-555-441-366 571-36 212-532zm-1635 860 180 453 487 32-375 311 121 473-413-261-412 261 121-473-376-311 487-32 180-453zm-1681 1563 212 532 571 37-441 365 142 555-484-307-483 307 141-555-440-365 571-37 211-532zm-20 1956 180 454 487 31-375 312 121 473-413-261-412 261 121-473-376-312 487-31 180-454zm-27-3536 180 453 487 31-376 312 121 473-412-261-413 261 121-473-376-312 488-31 180-453zm-2060 405 181 454 487 31-376 312 121 473-413-261-412 261 121-473-376-312 487-31 180-454zm-1321-16761 251 631 677 43-522 433 168 657-574-363-573 363 168-657-522-433 677-43 250-631zm-276 18360 211 533 572 36-441 366 142 554-484-306-484 306 142-554-441-366 571-36 212-533zm-972-13052 181 453 487 32-376 311 121 473-413-261-412 261 121-473-376-311 487-32 180-453zm-463 11013 180 454 487 31-375 311 121 473-413-261-412 261 121-473-376-311 487-31 180-454zm-3506-7005 211 532 572 37-441 365 142 555-484-306-484 306 142-555-441-365 571-37 212-532zm-102 4954 250 631 678 43-523 433 168 658-573-363-573 363 168-658-523-433 678-43 250-631zm57 6317 96 242 260 17-200 166 64 253-220-140-220 140 64-253-200-166 260-17 96-242zm-1103-8349 135 340 364 23-281 233 91 354-309-196-308 196 90-354-281-233 365-23 134-340zm-1276-1103 180 454 487 31-376 311 121 473-412-261-413 261 121-473-376-311 488-31 180-454zm-4536-4170 211 533 571 36-440 366 141 555-483-307-484 307 142-555-441-366 571-36 212-533zm-511 8821 250 631 678 44-523 433 168 657-573-363-574 363 169-657-523-433 677-44 251-631zm-1918-3482 212 532 571 37-441 365 142 555-484-307-483 307 141-555-440-365 571-37 211-532zm-632 1962 180 454 487 31-376 311 121 473-412-261-413 261 121-473-376-311 487-31 181-454zm-1303-4463 135 339 364 24-281 233 91 353-309-195-308 195 90-353-281-233 365-24 134-339zm-1603 704 250 631 678 43-523 433 168 658-573-363-573 363 168-658-523-433 678-43 250-631zm-1439-7266 251 631 677 43-522 433 168 658-574-363-573 363 168-658-522-433 677-43 250-631zm-394 8926 212 533 571 36-441 366 142 554-484-306-484 306 142-554-441-366 572-36 211-533z"
        />
        <path
          fill="#FFF"
          d="M39537 29605c10388 0 19911 3821 27238 10127 242-850 421-1726 532-2622-7597-6162-17265-9862-27770-9862-1821 0-3617 114-5382 330-377 805-695 1642-948 2507 2065-316 4179-480 6330-480z"
        />
        <path
          fill="#00923F"
          d="M35044 28698c14 171 64 300 148 388s194 126 331 115c137-12 241-68 309-170 69-101 95-237 81-408-15-171-65-300-149-388-85-88-196-126-334-114-137 11-239 68-307 169-67 100-94 236-79 408zm-326 28c-22-251 30-456 154-615s302-248 534-268 423 38 573 173c150 136 236 329 257 579 22 251-30 456-155 615-124 159-303 249-534 269-233 20-423-38-573-174-149-136-235-329-256-579zm2536-290 377-13c82-3 141-21 179-56 37-34 54-87 52-158-2-68-23-119-61-152-39-34-95-50-169-47l-392 13 14 413zm-291 887-52-1558 756-25c169-6 296 26 380 96 85 70 129 180 134 329 3 95-14 175-52 240-37 65-93 110-167 136 68 22 118 57 148 105 30 49 49 125 57 229l13 184v6c5 93 27 149 66 167l1 48-351 12c-12-22-21-48-28-80s-13-70-15-115l-10-164c-7-96-27-161-61-193-34-33-94-48-179-45l-340 11 21 606-321 11zm2300-350 257 5c149 3 258-34 326-111 68-76 104-203 107-377 3-175-25-303-86-386s-157-126-289-128l-296-6-19 1003zm-320 275 30-1558 610 11c240 5 417 73 532 204s170 328 165 591c-3 142-27 267-72 375-46 108-111 194-194 259-63 48-134 82-214 102-79 20-190 29-333 26l-524-10zm1978 35 84-1556 1131 61-15 270-815-44-17 332 744 40-14 266-745-40-21 400 852 46-15 288-1169-63zm1835 109 165-1550 472 50 182 1213 430-1147 473 50-165 1550-299-32 133-1250-448 1217-326-35-185-1284-134 1250-298-32zm4130 532 326-1524 1107 237-57 265-797-171-70 325 730 156-56 261-730-157-84 392 835 179-60 282-1144-245zm4125 96 300 81c81 21 144 20 190-4 46-25 80-75 100-152 20-71 16-130-10-177-26-46-75-79-147-98l-315-85-118 435zm-75 272-144 535-310-83 405-1505 670 180c158 43 266 117 326 220 59 104 67 236 24 395-41 155-113 264-216 326-102 63-228 74-375 35l-380-103zm1874 245 360 111c78 24 141 26 187 5 47-20 80-65 101-133 20-64 17-119-8-163-25-45-74-78-144-100l-375-115-121 395zm-564 744 457-1490 723 222c162 50 272 122 329 215 57 94 63 212 19 355-28 91-70 161-127 210s-124 74-202 74c57 43 93 92 106 148 12 56 5 134-21 235l-48 178c0 1-1 3-2 6-25 89-23 149 8 179l-14 46-336-104c-4-24-5-52-1-85 4-32 11-70 23-113l44-158c25-93 27-161 6-202-22-42-73-76-155-101l-325-100-178 579-306-94zm2373-5c-59 161-68 299-29 415 38 115 122 196 251 243 130 47 247 40 352-23s187-175 246-336c58-161 68-299 29-414-40-116-125-198-255-245-128-47-245-39-349 23-104 63-186 175-245 337zm-307-113c87-236 220-400 399-492 180-91 379-97 598-17 218 80 367 213 446 399 79 187 75 398-12 634-86 236-219 400-400 491-180 92-380 98-598 18-219-80-367-213-445-399s-74-398 12-634zm2884 1831c-84 49-167 76-250 81-82 5-169-12-260-51-200-86-333-224-398-416-65-193-49-402 47-628 98-229 238-385 420-469 182-85 377-83 583 5 180 77 308 182 385 317 77 134 94 281 51 441l-301-128c14-82 1-155-39-218-39-63-104-113-194-152-120-51-233-47-339 12-106 58-192 165-258 320-67 156-83 293-49 412s113 205 237 258c94 39 184 45 270 17 87-29 158-88 214-177l-325-139 104-245 594 253-331 776-197-84 36-185zm1482-41 338 166c74 36 135 47 184 34s89-51 121-116c29-60 35-114 17-162s-61-88-127-121l-352-172-181 371zm-674 646 685-1399 679 332c153 75 250 163 291 264 42 101 30 219-36 353-42 86-95 148-158 188-64 39-135 53-212 41 50 52 77 105 82 163 3 57-16 133-58 228l-75 169c0 1-1 3-3 5-39 84-46 144-20 179l-21 42-316-154c0-25 4-53 13-84 9-32 22-68 41-108l68-149c39-88 51-155 37-200-15-45-61-86-137-123l-305-150-267 544-288-141zm1742 895 758-1362 989 550-132 237-713-397-161 291 652 362-130 233-652-362-195 350 747 415-140 252-1023-569zm1759 483 271 163c-34 79-37 152-9 217s89 126 183 182c80 49 148 71 206 66 58-3 103-33 137-89 48-81-28-218-228-411l-7-7c-5-5-13-13-24-23-109-103-179-187-211-253-30-58-41-121-35-187s30-133 72-203c78-130 182-202 312-219 130-15 279 27 445 127 156 94 256 205 299 331 44 127 27 259-48 396l-264-159c34-68 39-132 14-192-24-61-78-117-160-166-72-44-136-63-192-59-56 5-99 33-131 85-43 71 2 169 132 296 35 34 63 61 82 80 83 84 140 145 173 183 32 39 58 75 78 111 36 63 53 127 50 193-3 67-25 135-67 204-84 139-195 218-335 238s-295-21-465-124c-168-101-277-219-325-355-48-135-33-277 47-425zm1642 1027 262 178c-38 77-44 149-19 216 24 66 82 130 173 191 77 52 144 78 202 77s105-28 141-82c53-79-16-219-206-423-2-2-5-5-6-7-6-5-13-13-23-25-103-108-169-195-198-263-26-59-34-123-25-188 10-66 37-132 83-199 85-126 193-193 323-202 131-9 277 41 438 150 151 102 244 217 281 346s14 259-69 392l-256-172c38-66 46-130 25-192s-72-120-151-174c-70-47-133-70-189-68s-101 28-135 78c-46 68-7 169 116 302 34 36 60 65 78 85 78 87 132 152 163 191 30 40 54 79 72 115 33 65 46 130 40 196s-32 133-78 200c-90 134-206 208-347 220-141 13-293-36-458-148-162-110-264-234-305-371-42-138-19-279 68-423zm1981 1051c-104 137-154 267-150 388 3 122 60 224 169 307 110 83 225 110 344 81 118-29 229-113 333-250 103-136 153-266 149-388-5-122-62-225-172-308-109-83-223-109-341-79-118 29-229 112-332 249zm-261-197c152-200 327-318 525-354 199-35 391 18 577 158 186 141 289 311 310 513 20 201-45 402-196 602-152 201-328 319-527 353-199 35-392-17-577-157-186-141-289-312-309-513-20-200 45-401 197-602z"
        />
      </svg>
    ),
  },
];

interface ILocaleProps {
  isOpen: boolean;
}

function Locale({ isOpen }: ILocaleProps) {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);

  const locale = getCookie("NEXT_LOCALE") || "en-US";

  const localeSelected = locales.find((l) => l.value === locale);

  useEffect(() => {
    if (!isOpen) {
      setIsOpenSubMenu(false);
    }
  }, [isOpen]);

  return (
    <motion.div className="border-[#22242C]  rounded-md mx-4">
      <li
        onClick={() => setIsOpenSubMenu((old) => !old)}
        className=" cursor-pointer flex flex-row items-center  fill-gray text-gray gap-4 px-6 py-3 rounded-md hover:text-blue hover:fill-blue hover:bg-[#22242C]"
      >
        <div>{localeSelected?.icon}</div>
        <motion.div
          variants={VARIANTS_MENU_ITEM}
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          className="text-14 shrink-0 flex flex-1"
        >
          {localeSelected?.name}
        </motion.div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={isOpenSubMenu ? { rotate: 180 } : { rotate: 0 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.25 8.625L12 15.375L18.75 8.625"
              stroke="currentcolor"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </li>
      <AnimatePresence>
        {isOpenSubMenu && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {locales.map((subMenu) => (
              <li
                key={subMenu.name}
                onClick={() => {
                  setCookie("NEXT_LOCALE", subMenu.value);
                  window.location.reload();
                }}
              >
                <div className="flex cursor-pointer select-none flex-row items-center fill-gray text-gray gap-4 px-6 py-3 rounded-md hover:text-blue hover:fill-blue hover:bg-[#22242C]">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {subMenu.icon}
                  </div>
                  <motion.div
                    variants={VARIANTS_MENU_ITEM}
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    className="text-14 shrink-0"
                  >
                    {subMenu.name}
                  </motion.div>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Locale;
