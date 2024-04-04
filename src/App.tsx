import { useState, useEffect } from 'react';
import { CountryData } from 'react-phone-input-2';
import { useGenerateWhatsappUrl } from '@/hooks';
import { isValidPhoneNumber } from '@/utils';

import { useSettings } from '@/context';
import { PhoneField, SettingsModal } from '@/components';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import UserList from './components/ListUser/UserList';

const App = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setDirection(i18n.language === 'he' ? 'rtl' : 'ltr');
  }, [i18n]);
  const { preferredCountry } = useSettings();

  const [direction, setDirection] = useState('rtl');
  const [whatsAppUrl, setWhatsAppUrl] = useGenerateWhatsappUrl();
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalSettings, setIsOpenModalSettings] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ username: '', phone: '' });
  const [message, setMessage] = useState('hi there!');
  const [greeting, setGreeting] = useState(t('app.greeting'));
  const [username, setUsername] = useState(selectedUser.username);

  const handleChange = (numberValue: string, country: CountryData) => {
    if (!numberValue.startsWith('+')) numberValue = `+${numberValue}`;
    const isValidPhone = isValidPhoneNumber(numberValue, country.countryCode);
    setIsPhoneValid(isValidPhone);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleGreetingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGreeting(e.target.value);
  };

  useEffect(() => {
    setToWhatsapp();
  }, [message, greeting]);

  useEffect(() => {
    setUsername(selectedUser.username);
  }, [selectedUser]);

  const setToWhatsapp = () => {
    const fullMessage = `${greeting} ${username} ${message}`;
    const isValidPhone = isValidPhoneNumber(selectedUser.phone, preferredCountry);
    setIsPhoneValid(isValidPhone);
    setWhatsAppUrl(isValidPhone ? selectedUser.phone : '', fullMessage);
    setIsLoading(false);
  };

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-gray-100'>
      <SettingsModal open={isOpenModalSettings} close={() => setIsOpenModalSettings(false)} />
      <button
        className='z-50 fixed top-5 right-5 cursor-pointer rounded-xl p-4 focus-visible:outline focus-visible:outline-emerald-600'
        onClick={() => setIsOpenModalSettings(true)}
      >
        <Cog6ToothIcon className='h-5 w-5 text-emerald-500' />
      </button>
      <div className='absolute z-10 mx-auto'>
        <h1 className='mb-4 text-2xl font-bold'>{t('app.userslist')}</h1>
        <UserList setSelectedUser={setSelectedUser} />
      </div>
      <div className='absolute top-0 left-0 aspect-1 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 blur-lg' />
      <div className='absolute right-0 bottom-0 aspect-1 w-80 translate-x-2/3 translate-y-2/3 rounded-full bg-emerald-300 blur-lg' />
      <div className='relative mx-auto h-full max-w-xs'>
        <div className='text-center flex h-full flex-col items-center justify-center gap-4'>
          <h1 className='text-3xl font-bold' dangerouslySetInnerHTML={{ __html: t('app.title') }}></h1>
          <PhoneField
            phoneUser={selectedUser.phone}
            preferredCountry={preferredCountry}
            onChange={handleChange}
            isValid={isPhoneValid}
          />
          <div className='flex flex-col gap-4' dir={direction}>
            <h2 className='text-lg font-medium'>
              <input
                type='text'
                value={greeting}
                onChange={handleGreetingChange}
                placeholder='Username'
                className='rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
              />
              <input
                type='text'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Username'
                className='rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
              />
              <textarea
                defaultValue={message}
                onChange={handleMessageChange}
                placeholder='Type your message...'
                className='rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none'
                rows={4}
              ></textarea>
            </h2>
          </div>
          <a
            aria-disabled={!isPhoneValid}
            href={whatsAppUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={`flex w-full items-center justify-center rounded-3xl bg-emerald-500 py-2 font-medium text-white focus-visible:outline focus-visible:outline-emerald-600 ${
              (!isPhoneValid || isLoading) && 'pointer-events-none opacity-60'
            }`}
            onClick={() => setIsLoading(true)}
          >
            {isLoading && (
              <svg
                className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            )}
            <span>{isLoading ? t('app.buttons.loading') + '...' : t('app.buttons.send')}</span>
          </a>
        </div>
        <div className='absolute bottom-10 w-full'>
          <p className='w-full text-center text-xs font-semibold text-gray-500'>
            {t('app.footer.madeWidth')} <span className='text-red-500'>❤</span> {t('app.footer.by')}{' '}
            <a target='_blank' rel='noopener noreferrer' className='text-emerald-500 hover:underline'>
              @ChaimBaror
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
