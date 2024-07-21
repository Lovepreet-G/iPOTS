import React, { useState } from 'react';

const Header = () => {

    return (
        <>
            <h1>
                Hompage
            </h1>
            <div id='location'>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Default
                        </label>
                </div>
                
            </div>
        </>
    );
}

export default Header;