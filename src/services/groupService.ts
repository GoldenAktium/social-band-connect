
import { supabase } from '@/integrations/supabase/client';
import type { Group, GroupMember } from '@/types/group';
import type { Musician } from '@/types/musician';

export async function loadUserGroups(userId: string): Promise<Group[]> {
  try {
    // Cast the entire supabase instance to any first to bypass TypeScript's type checking
    const { data, error } = await (supabase as any)
      .from('groups')
      .select('*')
      .eq('owner_id', userId);
    
    if (error) throw error;
    
    return data as Group[] || [];
  } catch (error) {
    console.error('Error loading groups:', error);
    throw error;
  }
}

export async function createGroup(name: string, ownerId: string): Promise<Group> {
  try {
    // Cast the entire supabase instance to any first to bypass TypeScript's type checking
    const { data, error } = await (supabase as any)
      .from('groups')
      .insert([
        { name, owner_id: ownerId }
      ])
      .select()
      .single();
    
    if (error) throw error;
    if (!data) throw new Error('No data returned from group creation');
    
    return data as Group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

export async function inviteMusicianToGroup(
  groupId: string,
  musicianId: string
): Promise<void> {
  try {
    // First check if user is already in the group
    const { data: existingMember, error: checkError } = await (supabase as any)
      .from('group_members')
      .select('*')
      .eq('group_id', groupId)
      .eq('user_id', musicianId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // If already a member, don't add again
    if (existingMember) return;
    
    const { error: memberError } = await (supabase as any)
      .from('group_members')
      .insert([
        { 
          group_id: groupId, 
          user_id: musicianId,
          status: 'invited'
        }
      ]);
    
    if (memberError) throw memberError;
  } catch (error) {
    console.error('Error inviting musician to group:', error);
    throw error;
  }
}
