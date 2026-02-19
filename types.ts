
export type Region = 
  | 'amazonica' 
  | 'amazonia-equatorial' 
  | 'amazonia-ocidental' 
  | 'extremo-norte' 
  | 'carajas' 
  | 'nordeste' 
  | 'sertaneja' 
  | 'tocantina' 
  | 'central' 
  | 'maranhense';

export interface Church {
  id: string;
  name: string;
  city: string;
  state: string;
  region: Region;
  address?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface AppConfig {
  main_title: string;
  button_text: string;
  background_color: string;
  surface_color: string;
  text_color: string;
  primary_action_color: string;
}
