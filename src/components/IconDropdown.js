import React, { useState } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

export function IconDropdown({ value = 'fa fa-rocket', name, onChange }) {
    const options = ['fa fa-heart', 'fa fa-rocket', 'fa fa-hourglass']

    return (
        <DropdownButton
            title={<i className={value} aria-hidden="true"></i>}
            name={name}
            onSelect={(eventKey) =>
                onChange({ target: { name, value: eventKey } })
            }
        >
            {options.map((option) => (
                <Dropdown.Item
                    active={value === option}
                    eventKey={option}
                    key={option}
                >
                    <i className={option} aria-hidden="true"></i>
                </Dropdown.Item>
            ))}
        </DropdownButton>
    )
}
