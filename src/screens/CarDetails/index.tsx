import React from 'react';
import {
 Container,
 Header,
 CarImages,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

export function CarDetails(){
   return (
    <Container>
        <Header>
            <BackButton onPress={() => {}} />
        </Header>

        <CarImages>
            <ImageSlider 
                imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} 
            />
        </CarImages>
    </Container>
   );
}