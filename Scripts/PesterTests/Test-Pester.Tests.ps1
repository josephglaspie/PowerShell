Describe 'New-User' {
    
    Context 'Input' {
        it 'creates a new AD user' {
            $true | should be $true
        }
    }
    Context 'Execution' {
        it 'creates a new AD user' {
            $true | should be $false
        }
    }
    Context 'Output'{
        it 'Stinky fart' {
            $false | should be $false
        }
    }
}