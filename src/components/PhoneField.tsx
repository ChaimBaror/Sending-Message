import { FC } from 'react';
import PhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';

const PhoneInputComponent = (PhoneInput as { default?: FC<PhoneInputProps> }).default
  ? (PhoneInput as unknown as { default: FC<PhoneInputProps> }).default
  : PhoneInput;

type Props = {
  onChange: (value: string, country: CountryData) => void;
  isValid: boolean;
  preferredCountry?: string;
  phoneUser?: string;
};

export const PhoneField = ({ onChange, isValid, preferredCountry, phoneUser = '' }: Props) => (
  <PhoneInputComponent
    value={phoneUser}
    localization={es}
    defaultMask={'... ... ....'}
    alwaysDefaultMask={true}
    country={preferredCountry ?? 'il'}
    preferredCountries={['il', 'co', 'us']}
    countryCodeEditable={false}
    enableSearch={true}
    disableSearchIcon={true}
    onChange={onChange}
    isValid={isValid}
    inputClass='peer'
    buttonClass='peer-focus:outline-none peer-focus:border-emerald-300 peer-focus-visible:outline-none'
  />
);
