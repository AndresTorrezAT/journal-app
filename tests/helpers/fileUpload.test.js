import { v2 as cloudinary } from 'cloudinary'; // SDK del cloudinary
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dnasl0ba6',
    api_key: '649279484318718',
    api_secret: 'v7dVDGtTmKau0BmVf6p1KIim6uM',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'https://www.nationalgeographic.com.es/medio/2022/12/02/desert-angel_778d8483_221202112927_800x800.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();//Puede contener datos de varios tipos, como imágenes, archivos de audio, etc.
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        
        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });

        // console.log({cloudResp});

    })

    test('debe de retornar null', async() => {

        const file = new File([], 'foto.jpg'); // archivo basicamente vacio
        const url = await fileUpload( file );
        expect( url ).toBe( null );

    })

})

//009 terminado