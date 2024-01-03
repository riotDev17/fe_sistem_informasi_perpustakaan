import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../store';
import { toggleTheme, toggleSidebar } from '../store/themeConfigSlice';
import Dropdown from '../components/Dropdown';
import IconMenu from '../components/Icons/IconMenu';
import IconSun from '../components/Icons/IconSun';
import IconMoon from '../components/Icons/IconMoon';
import IconLaptop from '../components/Icons/IconLaptop';
import IconUser from '../components/Icons/IconUser';
import IconLogout from '../components/Icons/IconLogout';
import auth from '../configs/auth';
import API from '../configs/api';
import Swal from 'sweetalert2';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [location]);

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await API.delete('/api/admin/logout');
      if (response.status === 200) {
        auth.removeToken();
        const toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
        toast.fire({
          icon: 'success',
          title: 'Anda Berhasil Logout',
          padding: '10px 20px',
        });

        navigate('/auth/admin/login');
      }
    } catch (error) {
      console.log(error);
      const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
      });
      toast.fire({
        icon: 'error',
        title: 'Anda Gagal Logout',
        padding: '10px 20px',
      });
    }
  };

  return (
    <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
            <Link to="/" className="main-logo flex items-center shrink-0">
              {/* <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="logo" /> */}
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">Book Verse Hub</span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            <div>
              {themeConfig.theme === 'light' ? (
                <button
                  className={`${
                    themeConfig.theme === 'light' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme('dark'));
                  }}
                >
                  <IconSun />
                </button>
              ) : (
                ''
              )}
              {themeConfig.theme === 'dark' && (
                <button
                  className={`${
                    themeConfig.theme === 'dark' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme('system'));
                  }}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === 'system' && (
                <button
                  className={`${
                    themeConfig.theme === 'system' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme('light'));
                  }}
                >
                  <IconLaptop />
                </button>
              )}
            </div>

            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="userProfile" />}
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                          John Doe
                          <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                        </h4>
                        <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                          johndoe@gmail.com
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/profile" className="dark:hover:text-white">
                      <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Profile
                    </Link>
                  </li>

                  <li className="border-t border-white-light dark:border-white-light/10">
                    <button type="button" onClick={handleLogout} className="dark:hover:text-white text-danger">
                      <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                      Logout
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        {/* <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDashboard className="shrink-0" />
                <span className="px-1">{t('dashboard')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/">{t('sales')}</NavLink>
              </li>
              <li>
                <NavLink to="/analytics">{t('analytics')}</NavLink>
              </li>
              <li>
                <NavLink to="/finance">{t('finance')}</NavLink>
              </li>
              <li>
                <NavLink to="/crypto">{t('crypto')}</NavLink>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuApps className="shrink-0" />
                <span className="px-1">{t('apps')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/apps/chat">{t('chat')}</NavLink>
              </li>
              <li>
                <NavLink to="/apps/mailbox">{t('mailbox')}</NavLink>
              </li>
              <li>
                <NavLink to="/apps/todolist">{t('todo_list')}</NavLink>
              </li>
              <li>
                <NavLink to="/apps/notes">{t('notes')}</NavLink>
              </li>
              <li>
                <NavLink to="/apps/scrumboard">{t('scrumboard')}</NavLink>
              </li>
              <li>
                <NavLink to="/apps/contacts">{t('contacts')}</NavLink>
              </li>
              <li className="relative">
                <button type="button">
                  {t('invoice')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/apps/invoice/list">{t('list')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/apps/invoice/preview">{t('preview')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/apps/invoice/add">{t('add')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/apps/invoice/edit">{t('edit')}</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/apps/calendar">{t('calendar')}</NavLink>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuComponents className="shrink-0" />
                <span className="px-1">{t('components')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/components/tabs">{t('tabs')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/accordions">{t('accordions')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/modals">{t('modals')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/cards">{t('cards')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/carousel">{t('carousel')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/countdown">{t('countdown')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/counter">{t('counter')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/sweetalert">{t('sweet_alerts')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/timeline">{t('timeline')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/notifications">{t('notifications')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/media-object">{t('media_object')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/list-group">{t('list_group')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/pricing-table">{t('pricing_tables')}</NavLink>
              </li>
              <li>
                <NavLink to="/components/lightbox">{t('lightbox')}</NavLink>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuElements className="shrink-0" />
                <span className="px-1">{t('elements')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/elements/alerts">{t('alerts')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/avatar">{t('avatar')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/badges">{t('badges')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/breadcrumbs">{t('breadcrumbs')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/buttons">{t('buttons')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/buttons-group">{t('button_groups')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/color-library">{t('color_library')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/dropdown">{t('dropdown')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/infobox">{t('infobox')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/jumbotron">{t('jumbotron')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/loader">{t('loader')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/pagination">{t('pagination')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/popovers">{t('popovers')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/progress-bar">{t('progress_bar')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/search">{t('search')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/tooltips">{t('tooltips')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/treeview">{t('treeview')}</NavLink>
              </li>
              <li>
                <NavLink to="/elements/typography">{t('typography')}</NavLink>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDatatables className="shrink-0" />
                <span className="px-1">{t('tables')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/tables">{t('tables')}</NavLink>
              </li>
              <li className="relative">
                <button type="button">
                  {t('datatables')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/datatables/basic">{t('basic')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/advanced">{t('advanced')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/skin">{t('skin')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/order-sorting">{t('order_sorting')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/multi-column">{t('multi_column')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/multiple-tables">{t('multiple_tables')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/alt-pagination">{t('alt_pagination')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/checkbox">{t('checkbox')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/range-search">{t('range_search')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/export">{t('export')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/datatables/column-chooser">{t('column_chooser')}</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuForms className="shrink-0" />
                <span className="px-1">{t('forms')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/forms/basic">{t('basic')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/input-group">{t('input_group')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/layouts">{t('layouts')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/validation">{t('validation')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/input-mask">{t('input_mask')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/select2">{t('select2')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/touchspin">{t('touchspin')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/checkbox-radio">{t('checkbox_and_radio')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/switches">{t('switches')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/wizards">{t('wizards')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/file-upload">{t('file_upload')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/quill-editor">{t('quill_editor')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/markdown-editor">{t('markdown_editor')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/date-picker">{t('date_and_range_picker')}</NavLink>
              </li>
              <li>
                <NavLink to="/forms/clipboard">{t('clipboard')}</NavLink>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuPages className="shrink-0" />
                <span className="px-1">{t('pages')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li className="relative">
                <button type="button">
                  {t('users')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/users/profile">{t('profile')}</NavLink>
                  </li>
                  <li>
                    <NavLink to="/users/user-account-settings">{t('account_settings')}</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/pages/knowledge-base">{t('knowledge_base')}</NavLink>
              </li>
              <li>
                <NavLink to="/pages/contact-us-boxed" target="_blank">
                  {t('contact_us_boxed')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/contact-us-cover" target="_blank">
                  {t('contact_us_cover')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/faq">{t('faq')}</NavLink>
              </li>
              <li>
                <NavLink to="/pages/coming-soon-boxed" target="_blank">
                  {t('coming_soon_boxed')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/coming-soon-cover" target="_blank">
                  {t('coming_soon_cover')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/maintenence" target="_blank">
                  {t('maintenence')}
                </NavLink>
              </li>
              <li className="relative">
                <button type="button">
                  {t('error')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/pages/error404" target="_blank">
                      {t('404')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/pages/error500" target="_blank">
                      {t('500')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/pages/error503" target="_blank">
                      {t('503')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('login')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/auth/cover-login" target="_blank">
                      {t('login_cover')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/boxed-signin" target="_blank">
                      {t('login_boxed')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('register')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/auth/cover-register" target="_blank">
                      {t('register_cover')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/boxed-signup" target="_blank">
                      {t('register_boxed')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('password_recovery')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/auth/cover-password-reset" target="_blank">
                      {t('recover_id_cover')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/boxed-password-reset" target="_blank">
                      {t('recover_id_boxed')}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('lockscreen')}
                  <div className="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden">
                  <li>
                    <NavLink to="/auth/cover-lockscreen" target="_blank">
                      {t('unlock_cover')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/boxed-lockscreen" target="_blank">
                      {t('unlock_boxed')}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuMore className="shrink-0" />
                <span className="px-1">{t('more')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <NavLink to="/dragndrop">{t('drag_and_drop')}</NavLink>
              </li>
              <li>
                <NavLink to="/charts">{t('charts')}</NavLink>
              </li>
              <li>
                <NavLink to="/font-icons">{t('font_icons')}</NavLink>
              </li>
              <li>
                <NavLink to="/widgets">{t('widgets')}</NavLink>
              </li>
              <li>
                <NavLink to="https://vristo.sbthemes.com" target="_blank">
                  {t('documentation')}
                </NavLink>
              </li>
            </ul>
          </li>
        </ul> */}
      </div>
    </header>
  );
};

export default Header;
