import { ModalProps } from "../../utils/types/types";

export default function AccountList({ handleModalContent }: ModalProps) {
  return (
    <ul className="list ">
      <li className="p-4 pb-2 text-xs  tracking-wide">
        <div className="navbar p-0 min-h-1">
          <div className="navbar-start">Accounts</div>
          <div className="navbar-end gap-2">
            <button className="btn">View All</button>
            <button
              className="btn btn-success"
              onClick={() => {
                handleModalContent("newAccount");
                const modal = document.getElementById(
                  "modal"
                ) as HTMLDialogElement | null;
                if (modal) modal.showModal();
              }}
            >
              {" "}
              Add New
            </button>
          </div>
        </div>
      </li>

      <li className="list-row">
        <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
        <div>
          <img
            className="size-10 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/1@94.webp"
          />
        </div>
        <div className="list-col-grow">
          <div>Kevin Rodrigues</div>
          <div className="text-xs uppercase font-semibold opacity-60">Visa</div>
        </div>
        <div className="flex items-center text-xs gap-2">
          <div
            aria-label="success"
            className="status status-success flex"
          ></div>
          <span className="opacity-60">Active</span>
        </div>
      </li>

      <li className="list-row">
        <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
        <div>
          <img
            className="size-10 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
          />
        </div>
        <div className="list-col-grow">
          <div>Keith Rodrigues</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            MasterCard
          </div>
        </div>
        <div className="flex items-center text-xs gap-2">
          <div
            aria-label="success"
            className="status status-success flex"
          ></div>
          <span className="opacity-60">Active</span>
        </div>
      </li>

      <li className="list-row">
        <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
        <div>
          <img
            className="size-10 rounded-box"
            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
          />
        </div>
        <div className="list-col-grow">
          <div>Helen Rodrigues</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            MasterCard
          </div>
        </div>
        <div className="flex items-center text-xs gap-2">
          <div aria-label="success" className="status  flex"></div>
          <span className="opacity-60">Disabled</span>
        </div>
      </li>
    </ul>
  );
}
