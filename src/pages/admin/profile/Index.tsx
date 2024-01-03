import { useEffect } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Admin | Profile'));
  });

  return (
    <div>
      <div className="pt-5">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
        </div>

        <div>
          <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Data Admin</h6>
            <div className="flex flex-col sm:flex-row">
              <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                <img src="/assets//images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input id="name" type="text" placeholder="Jimmy Turner" className="form-input" />
                </div>
                <div>
                  <label htmlFor="profession">Profession</label>
                  <input id="profession" type="text" placeholder="Web Developer" className="form-input" />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <select defaultValue="United States" id="country" className="form-select text-white-dark">
                    <option value="All Countries">All Countries</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Norway">Norway</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <input id="address" type="text" placeholder="New York" className="form-input" />
                </div>
                <div>
                  <label htmlFor="location">Location</label>
                  <input id="location" type="text" placeholder="Location" className="form-input" />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="text" placeholder="+1 (530) 555-12121" className="form-input" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="Jimmy@gmail.com" className="form-input" />
                </div>
                <div>
                  <label htmlFor="web">Website</label>
                  <input id="web" type="text" placeholder="Enter URL" className="form-input" />
                </div>
                <div>
                  <label className="inline-flex cursor-pointer">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-white-dark relative checked:bg-none">Make this my default address</span>
                  </label>
                </div>
                <div className="sm:col-span-2 mt-3">
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
